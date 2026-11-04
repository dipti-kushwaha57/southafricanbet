/**
 * Uploads real bookmaker logos and sets them as each Review's `icon` (replacing the
 * initials-badge placeholder). Source files live in scripts/seed-assets/bookmaker-logos/,
 * named "<review-slug>.png" — copied from the user's
 * "/home/strivedge/Downloads/gambling logo PNG and WebP" folder.
 *
 * Re-runnable: only touches reviews whose slug has a matching logo file here. Reviews with
 * no matching file are left untouched (and keep showing the initials badge) — add a file
 * named "<slug>.png" (or .webp) to this folder and re-run to fill one in later.
 *
 *   npx tsx scripts/set-bookmaker-logos.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

const ASSETS = path.resolve(process.cwd(), 'scripts/seed-assets/bookmaker-logos')
const ctx = { disableRevalidate: true }

async function run() {
  const payload = await getPayload({ config: configPromise })

  const files = fs
    .readdirSync(ASSETS)
    .filter((f) => /\.(png|webp)$/i.test(f))
    .map((f) => ({ file: f, slug: f.replace(/\.(png|webp)$/i, '') }))

  const reviews = await payload.find({ collection: 'reviews', limit: 100, pagination: false })

  let updated = 0
  const unmatched: string[] = []

  for (const { file, slug } of files) {
    const review = reviews.docs.find((r) => r.slug === slug)
    if (!review) {
      unmatched.push(file)
      continue
    }

    const filename = `${slug}-logo${path.extname(file)}`
    const existingMedia = await payload.find({ collection: 'media', limit: 1, where: { filename: { equals: filename } } })

    const media = existingMedia.docs[0]
      ? await payload.update({
          collection: 'media',
          id: existingMedia.docs[0].id,
          data: { alt: `${review.title} logo` },
          filePath: path.join(ASSETS, file),
          overwriteExistingFiles: true,
        })
      : await payload.create({
          collection: 'media',
          data: { alt: `${review.title} logo`, filename },
          filePath: path.join(ASSETS, file),
        })

    await payload.update({
      collection: 'reviews',
      id: review.id,
      context: ctx,
      data: { icon: media.id },
    })

    updated++
    payload.logger.info(`${review.title}: logo set`)
  }

  const reviewsWithoutLogo = reviews.docs.filter((r) => !files.some((f) => f.slug === r.slug) && !r.icon)
  payload.logger.info(`Done. Updated ${updated} review logo(s).`)
  if (unmatched.length) payload.logger.warn(`No review matched these filenames: ${unmatched.join(', ')}`)
  if (reviewsWithoutLogo.length) {
    payload.logger.warn(
      `Still on the initials badge (no logo file provided yet): ${reviewsWithoutLogo.map((r) => r.slug).join(', ')}`,
    )
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
