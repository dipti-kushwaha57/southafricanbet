/**
 * Fills in missing SEO meta title/description for reviews and posts that don't have one yet.
 * Idempotent: only writes where meta.title or meta.description is currently empty.
 *
 *   npx tsx scripts/fix-meta.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const ctx = { disableRevalidate: true }

const reviewMeta: Record<string, { title: string; description: string }> = {
  '10bet': {
    title: '',
    description:
      '10bet review 2026: welcome bonus, odds, mobile app, payment methods and payout speed, tested by our South African team.',
  },
  pantherbet: {
    title: 'PantherBet Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'PantherBet review 2026: welcome bonus, betting markets, odds quality, mobile app and payout speed, tested by our South African team.',
  },
  zarbet: {
    title: 'ZARbet Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'ZARbet review 2026: welcome bonus, crypto payments, casino games, odds and payout speed, tested by our South African team.',
  },
  hollywoodbets: {
    title: 'Hollywoodbets Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'Hollywoodbets review 2026: welcome bonus, sports markets, mobile app, payment options and payout speed, tested by our South African team.',
  },
  luckyfish: {
    title: 'LuckyFish Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'LuckyFish review 2026: welcome bonus, casino and sportsbook offering, payment methods and payout speed, tested by our South African team.',
  },
  yesplay: {
    title: 'YesPlay Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'YesPlay review 2026: welcome bonus, betting markets, odds quality, mobile app and payout speed, tested by our South African team.',
  },
  jabulabets: {
    title: 'JabulaBets Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'JabulaBets review 2026: welcome bonus, sports markets, mobile experience and payout speed, tested by our South African team.',
  },
  bettabets: {
    title: 'Bettabets Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'Bettabets review 2026: welcome bonus, betting markets, odds quality and payout speed, tested by our South African team.',
  },
  apexbets: {
    title: 'ApexBets Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'ApexBets review 2026: welcome bonus, sports markets, mobile app and payout speed, tested by our South African team.',
  },
  supersportbet: {
    title: 'SuperSportBet Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'SuperSportBet review 2026: welcome bonus, sports markets, odds quality and payout speed, tested by our South African team.',
  },
  playabets: {
    title: 'Playabets Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za',
    description:
      'Playabets review 2026: welcome bonus, betting markets, mobile app and payout speed, tested by our South African team.',
  },
}

const postMeta: Record<string, { title: string; description: string }> = {
  'is-online-betting-safe-in-south-africa': {
    title: 'Is Online Betting Safe in South Africa? | SouthAfricanBet.co.za',
    description:
      'Is online betting safe in South Africa? How licensing, payment security and responsible gambling tools protect you when choosing a betting site.',
  },
  'how-our-experts-review-south-african-betting-sites': {
    title: 'How Our Experts Review South African Betting Sites | SouthAfricanBet.co.za',
    description:
      'How our team tests South African betting sites: licensing checks, payout reliability, mobile performance and bonus terms, explained step by step.',
  },
  'how-do-i-know-a-betting-site-is-licensed': {
    title: 'How Do I Know a Betting Site Is Licensed? | SouthAfricanBet.co.za',
    description:
      'How to check if a betting site is licensed in South Africa, which provincial boards regulate operators, and the warning signs of an unlicensed site.',
  },
  'best-south-african-sports-to-bet-on': {
    title: 'Best South African Sports to Bet On | SouthAfricanBet.co.za',
    description:
      'The best sports to bet on in South Africa, from soccer and rugby to cricket and horse racing, with tips on markets, odds and where to bet.',
  },
  'how-to-bet-on-sports-betting-sites': {
    title: 'How to Bet on Sports Betting Sites: A Beginner’s Guide | SouthAfricanBet.co.za',
    description:
      'A beginner’s guide to betting on sports betting sites: signing up, placing your first bet, understanding odds, and staying in control.',
  },
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  for (const [slug, meta] of Object.entries(reviewMeta)) {
    const { docs } = await payload.find({ collection: 'reviews', limit: 1, where: { slug: { equals: slug } } })
    const doc = docs[0] as any
    if (!doc) {
      payload.logger.warn(`review not found: ${slug}`)
      continue
    }
    const title = meta.title || `${doc.title} Review 2026: Bonus, Odds & Payouts | SouthAfricanBet.co.za`
    const existing = doc.meta || {}
    if (existing.title && existing.description) continue
    await payload.update({
      collection: 'reviews',
      id: doc.id,
      data: { meta: { ...existing, title: existing.title || title, description: existing.description || meta.description } },
      context: ctx,
    })
    payload.logger.info(`Set meta for review: ${slug}`)
  }

  for (const [slug, meta] of Object.entries(postMeta)) {
    const { docs } = await payload.find({ collection: 'posts', limit: 1, where: { slug: { equals: slug } } })
    const doc = docs[0] as any
    if (!doc) {
      payload.logger.warn(`post not found: ${slug}`)
      continue
    }
    const existing = doc.meta || {}
    if (existing.title && existing.description) continue
    await payload.update({
      collection: 'posts',
      id: doc.id,
      data: { meta: { ...existing, title: existing.title || meta.title, description: existing.description || meta.description } },
      context: ctx,
    })
    payload.logger.info(`Set meta for post: ${slug}`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
