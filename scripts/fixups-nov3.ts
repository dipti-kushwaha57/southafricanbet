/**
 * Small targeted content fixes (not a full re-seed, so it won't clobber any admin edits):
 *  1. Renames the "Supabets" review to "SuperSportBet" (slug: supersportbet), matching
 *     betting.za.com's actual brand name for that bookmaker.
 *  2. Bumps the homepage "Best Sports Betting Sites in 2026" card grid's initial-visible
 *     count from 5 to 6, so the first view fills both 3-column rows instead of leaving an
 *     empty 6th slot before the "Show all" button.
 *
 *   npx tsx scripts/fixups-nov3.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function run() {
  const payload = await getPayload({ config: configPromise })

  // 1. Rename Supabets -> SuperSportBet
  const supabets = await payload.find({ collection: 'reviews', limit: 1, where: { slug: { equals: 'supabets' } } })
  if (supabets.docs[0]) {
    await payload.update({
      collection: 'reviews',
      id: supabets.docs[0].id,
      context: { disableRevalidate: true },
      data: { title: 'SuperSportBet', slug: 'supersportbet' },
    })
    payload.logger.info('Renamed Supabets -> SuperSportBet (slug: supersportbet)')
  } else {
    payload.logger.warn('No review with slug "supabets" found (already renamed?)')
  }

  // 2. Card grid: show 6 up front instead of 5
  const home = await payload.find({ collection: 'pages', limit: 1, where: { slug: { equals: 'home' } } })
  const page = home.docs[0]
  if (page) {
    const layout = (page.layout as any[]).map((block) =>
      block.blockType === 'reviewsBlock' && block.variant === 'card-grid' && block.anchorId === 'top'
        ? { ...block, initialVisible: 6 }
        : block,
    )
    await payload.update({
      collection: 'pages',
      id: page.id,
      context: { disableRevalidate: true },
      data: { layout },
    })
    payload.logger.info('Set "top" reviews card grid initialVisible to 6')
  } else {
    payload.logger.warn('Home page not found')
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
