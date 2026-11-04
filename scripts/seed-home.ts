// SUPERSEDED by scripts/seed-design.ts (betting-v2.1 homepage). Running this restores the OLD layout.
import configPromise from '@payload-config'
import { getPayload } from 'payload'

function richText(paragraphs: { tag?: 'h1' | 'p'; text: string }[]) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((p) => ({
        type: p.tag === 'h1' ? 'heading' : 'paragraph',
        tag: p.tag === 'h1' ? 'h1' : undefined,
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

async function run() {
  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const data: any = {
    title: 'Home',
    slug: 'home',
    _status: 'published' as const,
    hero: {
      type: 'bettingHero' as const,
      badge: 'Licensed by SA provincial boards',
      byline: 'Written by Dennis Kumar',
      headingHighlight: 'South Africa 2026',
      richText: richText([
        { tag: 'h1', text: 'Online Sports Betting Sites South Africa 2026' },
        {
          text: 'Back your favourite rugby team, predict a soccer upset or try your luck on a local horse race. Betting online is fast, secure and fully legal with bookmakers licensed by local provincial gambling boards.',
        },
      ]),
      links: [
        { link: { type: 'custom' as const, appearance: 'default' as const, icon: 'trophy' as const, label: 'List of Licensed Bookmakers', url: '/reviews' } },
        { link: { type: 'custom' as const, appearance: 'outline' as const, icon: 'gift' as const, label: 'Get Verified Free Spins', url: '/posts' } },
      ],
    },
    layout: [
      {
        blockType: 'reviewsBlock' as const,
        blockName: 'Best Sports Betting Sites',
        variant: 'card-grid' as const,
        source: 'featured' as const,
        heading: 'Best Sports Betting Sites in 2026',
        limit: 6,
        viewAllLink: { type: 'custom' as const, url: '/reviews', label: 'View all reviews' },
      },
      {
        blockType: 'reviewsBlock' as const,
        blockName: 'Top Online Sports Betting Sites',
        variant: 'detailed-list' as const,
        source: 'featured' as const,
        heading: 'Top Online Sports Betting Sites in South Africa',
        limit: 5,
        viewAllLink: { type: 'custom' as const, url: '/reviews', label: 'View all reviews' },
      },
      {
        blockType: 'postsBlock' as const,
        blockName: 'From Our Betting Blog',
        mode: 'all' as const,
        heading: 'From Our Betting Blog',
        limit: 5,
        viewAllLink: { type: 'custom' as const, url: '/posts', label: 'View all articles' },
      },
      {
        blockType: 'featureGrid' as const,
        blockName: 'How to Bet',
        eyebrow: 'Simple betting',
        heading: 'How to Bet on Sports Betting Sites',
        numbered: true,
        columns: '5' as const,
        items: [
          { title: 'Choose a Licensed Bookie', description: 'Pick a bookmaker from our ranked list that holds a valid provincial licence.' },
          { title: 'Create Your Account', description: 'Sign up with your ID number and basic details in a few minutes.' },
          { title: 'Deposit Funds', description: 'Add money via EFT, card, voucher or instant payment.' },
          { title: 'Place Your Bet', description: 'Select your odds, enter a stake and confirm your bet slip.' },
          { title: 'Withdraw Your Winnings', description: 'Request a payout straight to your bank account.' },
        ],
        ctaLink: { type: 'custom' as const, url: '/reviews', label: 'Learn more' },
      },
      {
        blockType: 'featureGrid' as const,
        blockName: 'Sports Guide',
        eyebrow: 'Markets & Specials',
        heading: 'Best South African Sports to Bet On',
        intro: 'Browse rugby, soccer, cricket, racing and more.',
        columns: '5' as const,
        items: [
          { title: 'Soccer', description: 'PSL derbies, Champions League and the Premier League attract the widest range of markets, including player props and live betting.' },
          { title: 'Rugby', description: 'Springboks Tests, URC and Currie Cup fixtures are covered by every major licensed bookmaker with handicap and try-scorer markets.' },
          { title: 'Cricket', description: 'From the SA20 and Proteas internationals to the IPL, cricket offers deep markets on match winners, top batters and bowlers.' },
          { title: 'Horse Racing', description: 'Follow local meetings and major international races with win, place and exotic bet markets.' },
          { title: 'Athletics & Specials', description: 'Horse racing, athletics, boxing and novelty specials round out the choice for punters who like something different.' },
        ],
        ctaLink: { type: 'custom' as const, url: '/reviews', label: 'Learn more' },
      },
      {
        blockType: 'featureGrid' as const,
        blockName: 'Licensing',
        eyebrow: 'Why Licensing Matters',
        heading: 'Legal and Licensed Bookmakers in South Africa',
        intro: 'A licence is a sign of a genuine, accountable operator. All online bookmakers must hold a valid licence from an official provincial gambling board. A recognised regulator means the bookmaker is trustworthy, accountable and compliant with the National Gambling Act.',
        columns: '3' as const,
        items: [
          { title: 'National Gambling Board', description: 'Oversees gambling regulation nationally under the National Gambling Act.' },
          { title: 'Free State Gambling, Liquor and Tourism Authority', description: 'One of several provincial regulators licensing South African bookmakers.' },
          { title: 'Provincial Regulators', description: 'Each province licenses and monitors operators serving South African punters.' },
        ],
        ctaLink: { type: 'custom' as const, url: '/reviews', label: 'Learn more' },
      },
      {
        blockType: 'featureGrid' as const,
        blockName: 'Methodology',
        eyebrow: 'Methodology',
        heading: 'How Our Experts Review South African Betting Sites',
        intro: 'Our reviewers are South African punters. We deposit, bet and withdraw ourselves. Scores are never for sale. Offers are checked and refreshed regularly.',
        columns: '4' as const,
        items: [
          { title: 'Ease of Registration', description: 'How quickly a new player can sign up and verify.' },
          { title: 'Mobile Experience', description: 'App and mobile-site speed and usability.' },
          { title: 'Withdrawal Speed', description: 'How fast real withdrawals actually land.' },
          { title: 'Customer Support', description: 'Response time and quality of live chat and email.' },
        ],
        ctaLink: { type: 'custom' as const, url: '/reviews', label: 'Learn more' },
      },
      {
        blockType: 'faqBlock' as const,
        blockName: 'FAQ',
        eyebrow: 'Questions',
        heading: 'Frequently Asked Questions',
        intro: 'Quick answers to what South African punters ask us most about licensed online betting.',
        items: [
          { question: 'Is online betting legal in South Africa?', answer: 'Yes. Online sports betting is legal with bookmakers licensed by a provincial gambling board under the National Gambling Act.' },
          { question: 'How do I know a betting site is licensed?', answer: 'Check the footer of the homepage for the licence number and the name of the provincial board.' },
          { question: 'What is the minimum deposit for online betting?', answer: 'Most licensed sites let you start with as little as R5 to R50, depending on the bookmaker and payment method.' },
          { question: 'How do I withdraw my winnings?', answer: 'Go to the cashier, choose Withdraw, pick your bank or e-wallet and confirm. FICA verification may be required first.' },
          { question: 'What is the minimum age to bet?', answer: 'You must be 18 or older to bet online in South Africa.' },
          { question: 'Is online betting safe in South Africa?', answer: 'It is safe with licensed operators that use encryption and offer responsible gambling tools.' },
          { question: 'Can I bet using my phone or tablet?', answer: 'Yes, all our top picks offer a mobile site and most have a dedicated app.' },
          { question: 'Which are the best betting sites in South Africa right now?', answer: 'See our ranked list above: each brand is licensed, tested with real money and reviewed by our team.' },
        ],
      },
    ],
    meta: {
      title: 'Online Sports Betting Sites South Africa 2026 | SouthAfricanBet.co.za',
      description:
        'Honest, tested and up-to-date guides to licensed South African betting sites. We only recommend bookmakers regulated by a provincial gambling board.',
    },
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Updated existing home page (id ${existing.docs[0].id})`)
  } else {
    await payload.create({ collection: 'pages', data, context: { disableRevalidate: true } })
    payload.logger.info('Created home page')
  }

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { type: 'custom', icon: 'home', label: 'Home', url: '/' } },
        { link: { type: 'custom', icon: 'trophy', label: 'Top Sites', url: '/reviews' } },
        { link: { type: 'custom', icon: 'sports', label: 'Sports', url: '/sports' }, hasDropdown: true },
        { link: { type: 'custom', icon: 'gift', label: 'Free Bonuses', url: '/free-bets' }, hasDropdown: true },
        { link: { type: 'custom', icon: 'star', label: 'Reviews', url: '/reviews' }, hasDropdown: true },
        { link: { type: 'custom', icon: 'shield', label: 'Licensing', url: '/licensing' } },
        { link: { type: 'custom', icon: 'help', label: 'FAQs', url: '/faqs' } },
      ],
      ctaLink: { type: 'custom', label: 'Get Bonus', url: '/reviews' },
      helplineNumber: '0800 006 008',
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          title: 'Popular Pages',
          navItems: [
            { link: { type: 'custom', label: 'Bookmaker Reviews', url: '/reviews' } },
            { link: { type: 'custom', label: 'Casino Bonuses', url: '/casino-bonuses' } },
            { link: { type: 'custom', label: 'Free Bets', url: '/free-bets' } },
            { link: { type: 'custom', label: 'Betting Apps', url: '/betting-apps' } },
            { link: { type: 'custom', label: 'Online Casino Reviews', url: '/online-casino-reviews' } },
            { link: { type: 'custom', label: 'Free Spins Casinos', url: '/free-spins-casinos' } },
            { link: { type: 'custom', label: 'Payment Methods', url: '/payment-methods' } },
          ],
        },
        {
          title: 'Legal',
          navItems: [
            { link: { type: 'custom', label: 'Affiliate Disclosure', url: '/affiliate-disclosure' } },
            { link: { type: 'custom', label: 'Privacy Policy', url: '/privacy-policy' } },
            { link: { type: 'custom', label: 'Terms & Conditions', url: '/terms-conditions' } },
            { link: { type: 'custom', label: 'Cookies Policy', url: '/cookies-policy' } },
            { link: { type: 'custom', label: 'Disclaimer', url: '/disclaimer' } },
            { link: { type: 'custom', label: 'Responsible Gambling', url: '/responsible-gambling' } },
            { link: { type: 'custom', label: 'Contact Us', url: '/contact' } },
          ],
        },
      ],
      newsletter: {
        heading: 'Newsletter',
        text: 'Get the latest free bonus offers',
        disclaimer: 'One email a week. No spam, unsubscribe anytime.',
        buttonLabel: 'Subscribe',
      },
      licensingAuthorities: [
        { name: 'National Gambling Board' },
        { name: 'Free State Gambling, Liquor and Tourism Authority' },
      ],
      responsibleGamblingText:
        'Gambling can be addictive, please play responsibly. You must be 18 or older to bet online in South Africa.',
      helplineNumber: '0800 006 008',
      navItems: [
        { link: { type: 'custom', label: 'Admin', url: '/admin' } },
      ],
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info('Seeded home page and header/footer globals.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
