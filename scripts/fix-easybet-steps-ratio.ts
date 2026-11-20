/**
 * Sets a 60-40 column split (steps favored) on the easybet review's reviewSteps block,
 * instead of the old ~50-50 default that made the screenshot look oversized next to
 * a short step list.
 *
 *   npx tsx scripts/fix-easybet-steps-ratio.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const ctx = { disableRevalidate: true }

async function run() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({ collection: 'reviews', limit: 1, where: { slug: { equals: 'easybet' } } })
  const review = docs[0]
  if (!review) throw new Error('easybet review not found')

  const layout = [...(review.layout || [])]
  const index = layout.findIndex((b: any) => b.blockType === 'reviewSteps')
  if (index === -1) throw new Error('no reviewSteps block found')

  layout[index] = { ...layout[index], columnRatio: '60-40' } as (typeof layout)[number]

  await payload.update({ collection: 'reviews', id: review.id, data: { layout }, context: ctx })
  payload.logger.info('Set reviewSteps column ratio to 60-40')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
