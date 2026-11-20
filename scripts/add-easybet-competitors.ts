/**
 * Adds two more head-to-head comparisons (vs 10bet, vs ZARbet) to the easybet review,
 * right after the existing "vs Hollywoodbets" reviewCompare block, matching the three
 * competitors actually named in the source content.
 *
 *   npx tsx scripts/add-easybet-competitors.ts
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
  const compareIndex = layout.findIndex((b: any) => b.blockType === 'reviewCompare')
  if (compareIndex === -1) throw new Error('no existing reviewCompare block found')

  const tenbet = await payload.find({ collection: 'reviews', limit: 1, where: { slug: { equals: '10bet' } } })
  const zarbet = await payload.find({ collection: 'reviews', limit: 1, where: { slug: { equals: 'zarbet' } } })

  const makeCompare = (opponentId: number, opponentShortName: string, tocLabel: string, heading: string, summary: string) => ({
    blockType: 'reviewCompare' as const,
    anchorId: `compare-${opponentShortName.toLowerCase()}`,
    attachToPrevious: true,
    badge: 'Our pick',
    eyebrow: 'Head to head',
    heading,
    opponent: opponentId,
    opponentShortName,
    rows: [
      { kind: 'bonus' as const, label: 'Welcome bonus', winner: 'ours' as const },
      { kind: 'rating' as const, label: 'Rating', winner: 'tie' as const },
    ],
    summary,
    tocLabel,
  })

  const additions = []
  if (tenbet.docs[0]) {
    additions.push(
      makeCompare(
        tenbet.docs[0].id as number,
        '10bet',
        'vs 10bet',
        'EasyBet vs 10bet',
        '10bet has broader sports depth and a strong loyalty programme; EasyBet counters with a data-free app and a layered welcome package.',
      ),
    )
  }
  if (zarbet.docs[0]) {
    additions.push(
      makeCompare(
        zarbet.docs[0].id as number,
        'ZARbet',
        'vs ZARbet',
        'EasyBet vs ZARbet',
        'ZARbet offers crypto payments and exclusive Genii casino titles; EasyBet counters with dual SA licences and weekly cashback across more verticals.',
      ),
    )
  }

  layout.splice(compareIndex + 1, 0, ...additions)

  await payload.update({ collection: 'reviews', id: review.id, data: { layout }, context: ctx })
  payload.logger.info(`Added ${additions.length} more head-to-head comparisons to easybet`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
