/**
 * Finds every internal link stored in the Header global, Footer global, and the home Page's
 * content blocks, and replaces any that point at a route that doesn't actually exist
 * (not a real Page/Post slug, not `/reviews/*` — that route isn't built yet — and not a known
 * static route or homepage anchor) with `#`, so clicking it does nothing instead of 404ing.
 *
 * Safe to re-run any time content changes (re-seeding, admin edits) might introduce a new
 * link to a page that doesn't exist yet.
 *
 *   npx tsx scripts/fix-broken-links.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const ctx = { disableRevalidate: true }

const STATIC_SAFE_PATHS = new Set(['/', '/posts', '/search', '/admin'])
const ANCHOR_RE = /^\/?#[\w-]+$/

async function run() {
  const payload = await getPayload({ config: configPromise })

  const [pages, posts] = await Promise.all([
    payload.find({ collection: 'pages', limit: 1000, pagination: false, select: { slug: true } }),
    payload.find({ collection: 'posts', limit: 1000, pagination: false, select: { slug: true } }),
  ])
  const safePaths = new Set(STATIC_SAFE_PATHS)
  for (const page of pages.docs) safePaths.add(page.slug === 'home' ? '/' : `/${page.slug}`)
  for (const post of posts.docs) safePaths.add(`/posts/${post.slug}`)

  const isSafe = (url: string): boolean => {
    if (!url) return true // empty: nothing to fix
    if (/^(https?:|mailto:|tel:)/.test(url)) return true // external/contact links: leave alone
    if (ANCHOR_RE.test(url)) return true // homepage anchors, e.g. /#top or #top
    if (url.startsWith('/reviews/')) return false // route doesn't exist yet — always unsafe for now
    return safePaths.has(url)
  }

  let fixed = 0
  const fixedUrls: string[] = []

  /** Walks any JSON value, fixing `.url` on `{ type: 'custom', url }` and `{ label, url }` shapes. */
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (!node || typeof node !== 'object') return

    const obj = node as Record<string, unknown>
    if (typeof obj.url === 'string' && (obj.type === 'custom' || typeof obj.label === 'string')) {
      if (!isSafe(obj.url)) {
        fixedUrls.push(obj.url)
        obj.url = '#'
        fixed++
      }
    }
    for (const value of Object.values(obj)) walk(value)
  }

  const header = await payload.findGlobal({ slug: 'header' })
  walk(header)
  await payload.updateGlobal({ slug: 'header', context: ctx, data: header })

  const footer = await payload.findGlobal({ slug: 'footer' })
  walk(footer)
  await payload.updateGlobal({ slug: 'footer', context: ctx, data: footer })

  const home = await payload.find({ collection: 'pages', limit: 1, where: { slug: { equals: 'home' } } })
  if (home.docs[0]) {
    const page = home.docs[0]
    walk(page.hero)
    walk(page.layout)
    await payload.update({ collection: 'pages', id: page.id, context: ctx, data: { hero: page.hero, layout: page.layout } })
  }

  payload.logger.info(`Fixed ${fixed} broken link(s).`)
  if (fixedUrls.length) payload.logger.info(`Was pointing to: ${[...new Set(fixedUrls)].join(', ')}`)

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
