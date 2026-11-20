/**
 * Fixes the easybet review's reviewBonus block: it headlined only the 150% deposit match
 * and buried the R50 + 25 Free Spins no-deposit bonus in the description. Both offers are
 * now equally visible - sign-up bonus in the title, deposit match broken out as its own row.
 *
 *   npx tsx scripts/fix-easybet-bonus.ts
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
  const index = layout.findIndex((b: any) => b.blockType === 'reviewBonus')
  if (index === -1) throw new Error('no reviewBonus block found')

  const block: any = { ...layout[index] }
  block.title = 'R50 Sign Up Bonus + 25 Free Spins'
  block.description =
    'Plus a 150% First Deposit Match up to R5,000, a R500 First Bet Match, and an Aviator Welcome Bonus of up to 10 Bonus Flights.'
  block.rows = [
    {
      label: 'No-deposit bonus',
      value: 'R50 + 25 Free Spins with a promo code (R25 + 25 Free Spins without one)',
    },
    { label: 'First deposit match', value: '150% up to R5,000' },
    { label: 'Min deposit', value: 'R20' },
    { label: 'Sports / Lucky Numbers rollover', value: '4× deposit value at odds 2.0+' },
    { label: 'Free spins route', value: 'Up to 100 Free Spins on selected Pragmatic Play slots' },
    { label: 'How to claim', value: 'Contact live chat or email after depositing' },
    { label: 'Max withdrawal from bonus', value: 'R10,000' },
  ]

  layout[index] = block

  await payload.update({ collection: 'reviews', id: review.id, data: { layout }, context: ctx })
  payload.logger.info('Fixed easybet reviewBonus block')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
