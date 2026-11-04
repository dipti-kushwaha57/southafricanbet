import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

function richText(paragraphs: { tag?: 'h1' | 'h2' | 'p'; text: string }[]) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((p) => ({
        type: p.tag ? 'heading' : 'paragraph',
        tag: p.tag,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: p.text,
            version: 1,
          },
        ],
      })),
    },
  }
}

// Real bookmaker data extracted from the reference bundle (betting-v2 1.html).
const BOOKMAKERS: {
  name: string
  slug: string
  color: string
  rating: number
  offer: string
  code?: string
}[] = [
  { name: 'PantherBet', slug: 'pantherbet', color: '#7c3aed', rating: 4.8, offer: 'Get up to R15,000 + 100 Bonus Spins', code: 'PANTHER100' },
  { name: '10bet', slug: '10bet', color: '#0f172a', rating: 4.7, offer: '100% up to R3,000 Welcome Bonus' },
  { name: 'ZARbet', slug: 'zarbet', color: '#111827', rating: 4.7, offer: '50 Free Spins on Big Blue Fishing', code: 'ZAR50' },
  { name: 'Hollywoodbets', slug: 'hollywoodbets', color: '#6d28d9', rating: 4.6, offer: 'R25 Free Bonus + 50 Free Spins on Sign Up' },
  { name: 'LuckyFish', slug: 'luckyfish', color: '#0e7490', rating: 4.6, offer: '50 Habanero Bonus Spins & R50 When You Sign Up' },
  { name: 'YesPlay', slug: 'yesplay', color: '#ea580c', rating: 4.6, offer: '100% bonus up to R3,000' },
  { name: 'JabulaBets', slug: 'jabulabets', color: '#16a34a', rating: 4.7, offer: '30 Free Spins On Sign-Up' },
  { name: 'Bettabets', slug: 'bettabets', color: '#ca8a04', rating: 3.9, offer: '250% Welcome Bonus up to R5,000' },
  { name: 'ApexBets', slug: 'apexbets', color: '#dc2626', rating: 4.5, offer: 'Up to R30,000 across 5 deposits' },
  { name: 'Betway', slug: 'betway', color: '#059669', rating: 4.5, offer: 'Bet R50, Get R50 Free Bet' },
  { name: 'SuperSportBet', slug: 'supersportbet', color: '#b91c1c', rating: 4.4, offer: 'R50 Free Bet on Sign-up' },
  { name: 'Sunbet', slug: 'sunbet', color: '#d97706', rating: 4.4, offer: 'R100 Free Bet + 100 Spins' },
  { name: 'Playabets', slug: 'playabets', color: '#4338ca', rating: 4.3, offer: '100% Match up to R1,500' },
  { name: 'Easybet', slug: 'easybet', color: '#0369a1', rating: 4.3, offer: 'R200 Free Bet for New Players' },
]

const BEST_FOR = [
  'Casino & sports combined',
  'Simple betting',
  'Big welcome bonus',
  'Local favourite',
  'Free spins on sign-up',
]

// Real article topics/content extracted from the reference bundle.
const POSTS = [
  {
    title: 'How to Bet on Sports Betting Sites',
    slug: 'how-to-bet-on-sports-betting-sites',
    category: 'Betting Guides',
    paragraphs: [
      { tag: 'h2' as const, text: 'Choose a Licensed Bookie' },
      { text: 'Pick a bookmaker from our ranked list that holds a valid provincial licence.' },
      { tag: 'h2' as const, text: 'Create Your Account' },
      { text: 'Sign up with your ID number and basic details in a few minutes.' },
      { tag: 'h2' as const, text: 'Deposit Funds' },
      { text: 'Add money via EFT, card, voucher or instant payment.' },
      { tag: 'h2' as const, text: 'Place Your Bet' },
      { text: 'Select your odds, enter a stake and confirm your bet slip.' },
      { tag: 'h2' as const, text: 'Withdraw Your Winnings' },
      { text: 'Request a payout straight to your bank account.' },
    ],
  },
  {
    title: 'Best South African Sports to Bet On',
    slug: 'best-south-african-sports-to-bet-on',
    category: 'Betting Guides',
    paragraphs: [
      { tag: 'h2' as const, text: 'Soccer' },
      { text: 'PSL derbies, Champions League and the Premier League attract the widest range of markets, including player props and live betting.' },
      { tag: 'h2' as const, text: 'Rugby' },
      { text: 'Springboks Tests, URC and Currie Cup fixtures are covered by every major licensed bookmaker with handicap and try-scorer markets.' },
      { tag: 'h2' as const, text: 'Cricket' },
      { text: 'From the SA20 and Proteas internationals to the IPL, cricket offers deep markets on match winners, top batters and bowlers.' },
      { tag: 'h2' as const, text: 'Athletics & Specials' },
      { text: 'Horse racing, athletics, boxing and novelty specials round out the choice for punters who like something different.' },
    ],
  },
  {
    title: 'How Do I Know a Betting Site Is Licensed?',
    slug: 'how-do-i-know-a-betting-site-is-licensed',
    category: 'Responsible Gambling',
    paragraphs: [
      { text: 'A licence is a sign of a genuine, accountable operator. All online bookmakers must hold a valid licence from an official provincial gambling board. A recognised regulator means the bookmaker is trustworthy, accountable and compliant with the National Gambling Act.' },
      { tag: 'h2' as const, text: 'National Gambling Board' },
      { text: 'Oversees gambling regulation nationally under the National Gambling Act.' },
      { tag: 'h2' as const, text: 'Provincial Regulators' },
      { text: 'Each province licenses and monitors operators serving South African punters.' },
    ],
  },
  {
    title: 'How Our Experts Review South African Betting Sites',
    slug: 'how-our-experts-review-south-african-betting-sites',
    category: 'Betting Guides',
    paragraphs: [
      { text: 'Our reviewers are South African punters. We deposit, bet and withdraw ourselves. Scores are never for sale. Offers are checked and refreshed regularly.' },
      { tag: 'h2' as const, text: 'Ease of Registration' },
      { text: 'How quickly a new player can sign up and verify.' },
      { tag: 'h2' as const, text: 'Mobile Experience' },
      { text: 'App and mobile-site speed and usability.' },
      { tag: 'h2' as const, text: 'Withdrawal Speed' },
      { text: 'How fast real withdrawals actually land.' },
      { tag: 'h2' as const, text: 'Customer Support' },
      { text: 'Response time and quality of live chat and email.' },
    ],
  },
  {
    title: 'Is Online Betting Safe in South Africa?',
    slug: 'is-online-betting-safe-in-south-africa',
    category: 'Responsible Gambling',
    paragraphs: [
      { text: 'Is online betting legal in South Africa? Yes — betting with a provincially licensed bookmaker is legal and regulated. Stick to licensed sites, and use self-exclusion tools if you need a break.' },
      { tag: 'h2' as const, text: 'Self-Exclusion for SA Sports Bettors' },
      { text: 'Every licensed operator must offer self-exclusion and responsible-gambling tools to its players.' },
    ],
  },
]

async function getOrCreatePlaceholderMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Bookmaker logo placeholder' } },
    limit: 1,
  })
  if (existing.docs[0]) return existing.docs[0]

  const filePath = path.resolve(process.cwd(), 'public/website-template-OG.webp')
  const buffer = fs.readFileSync(filePath)

  return payload.create({
    collection: 'media',
    data: { alt: 'Bookmaker logo placeholder' },
    file: {
      data: buffer,
      mimetype: 'image/webp',
      name: 'bookmaker-logo-placeholder.webp',
      size: buffer.length,
    },
  })
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding reviews...')
  for (let i = 0; i < BOOKMAKERS.length; i++) {
    const b = BOOKMAKERS[i]
    const existing = await payload.find({
      collection: 'reviews',
      where: { slug: { equals: b.slug } },
      limit: 1,
    })

    const data = {
      title: b.name,
      slug: b.slug,
      rating: b.rating,
      rank: i + 1,
      featured: i < 6,
      icon: null as unknown as number,
      bonusText: b.offer,
      promotionalCode: b.code,
      bestFor: BEST_FOR[i % BEST_FOR.length],
      whyWeLoveIt: `${b.name} stands out for ${BEST_FOR[i % BEST_FOR.length].toLowerCase()} and a bonus South African punters rate highly: ${b.offer}.`,
      features: [{ text: BEST_FOR[i % BEST_FOR.length] }, { text: 'Licensed by a provincial gambling board' }],
      minDeposit: 'R50',
      payoutTime: '24-48 hours',
      gamesOffered: 'Sports & Casino',
      content: richText([{ text: `${b.name} offer: ${b.offer}` }]),
      _status: 'published' as const,
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'reviews', id: existing.docs[0].id, data, context: { disableRevalidate: true } })
    } else {
      await payload.create({ collection: 'reviews', data, context: { disableRevalidate: true } })
    }
    console.log(`  - ${b.name} (rank ${i + 1}, featured: ${i < 6})`)
  }

  console.log('Seeding categories...')
  const categoryNames = Array.from(new Set(POSTS.map((p) => p.category)))
  const categoryIds: Record<string, number> = {}
  for (const name of categoryNames) {
    const existing = await payload.find({
      collection: 'categories',
      where: { title: { equals: name } },
      limit: 1,
    })
    if (existing.docs[0]) {
      categoryIds[name] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'categories',
        data: { title: name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
      })
      categoryIds[name] = created.id
    }
  }

  console.log('Seeding posts...')
  for (const p of POSTS) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })

    const data = {
      title: p.title,
      slug: p.slug,
      content: richText(p.paragraphs),
      categories: [categoryIds[p.category]],
      publishedAt: new Date().toISOString(),
      _status: 'published' as const,
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'posts', id: existing.docs[0].id, data, context: { disableRevalidate: true } })
    } else {
      await payload.create({ collection: 'posts', data, context: { disableRevalidate: true } })
    }
    console.log(`  - ${p.title}`)
  }

  console.log('Done.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
