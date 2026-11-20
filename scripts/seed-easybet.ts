/**
 * Seeds the EasyBet review's `layout` using the same purpose-built review blocks as the
 * 10bet review (ReviewScoreboard, ReviewFactGrid, ReviewProsCons, ReviewSplit, ReviewBonus,
 * ReviewSteps, ReviewTabsGallery, ReviewShowcase, ReviewPayments, ReviewCards, ReviewCompare,
 * ReviewVerdict, ReviewFaq) instead of generic prose blocks - content pulled from the
 * reference WordPress site's easybet review (blog/testimonials sections excluded).
 *
 *   npx tsx scripts/seed-easybet.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import path from 'path'
import { getPayload } from 'payload'

const ctx = { disableRevalidate: true }
const IMAGES = path.resolve('/tmp/easybet-images')

async function run() {
  const payload = await getPayload({ config: configPromise })

  const media: Record<string, number> = {}
  const upload = async (file: string, alt: string) => {
    const existing = await payload.find({ collection: 'media', limit: 1, where: { filename: { equals: file } } })
    if (existing.docs[0]) return (media[file] = existing.docs[0].id as number)
    const created = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(IMAGES, file) })
    return (media[file] = created.id as number)
  }

  // ---- payment icons --------------------------------------------------------------
  await upload('payment2.png', 'OZOW / EasyBet Instant EFT')
  await upload('payment1.png', 'Visa / Mastercard')
  await upload('payment13.png', 'OTT Voucher')
  await upload('blu-pay.png', 'Blu Voucher')
  await upload('payment12.png', '1Voucher')
  await upload('easy-pay.png', 'Easyload')
  await upload('snap-pay.png', 'SnapScan')
  await upload('payment4.png', 'Direct Bank Transfer')
  await upload('payment3.png', 'Instant Money')
  await upload('payment11.png', 'OTT eWallet')

  // ---- section screenshots ----------------------------------------------------------
  await upload('easybet-registration.jpg', 'EasyBet registration form')
  await upload('easybet-user.jpg', 'EasyBet homepage design')
  await upload('easybet-desk-mobile.jpg', 'EasyBet desktop vs mobile')
  await upload('easybet-casino.jpg', 'EasyBet casino lobby')

  const opponent = await payload.find({ collection: 'reviews', limit: 1, where: { slug: { equals: 'hollywoodbets' } } })
  const opponentId = opponent.docs[0]?.id

  const paymentMethods = [
    { name: 'OZOW / EasyBet Instant EFT', icon: media['payment2.png'] },
    { name: 'Visa / Mastercard', icon: media['payment1.png'] },
    { name: 'OTT Voucher', icon: media['payment13.png'] },
    { name: 'Blu Voucher', icon: media['blu-pay.png'] },
    { name: '1Voucher', icon: media['payment12.png'] },
    { name: 'Easyload', icon: media['easy-pay.png'] },
    { name: 'SnapScan', icon: media['snap-pay.png'] },
    { name: 'Direct Bank Transfer', icon: media['payment4.png'] },
    { name: 'Instant Money', icon: media['payment3.png'] },
    { name: 'OTT eWallet', icon: media['payment11.png'] },
  ]

  const data = {
    bonusText: 'R50 Sign Up Bonus + 25 Free Spins',
    whyWeLoveIt:
      'EasyBet stands out for its layered welcome package and a bonus South African punters rate highly: R50 Sign Up Bonus + 25 Free Spins.',
    minDeposit: 'R5',
    payoutTime: '1–2 business days',
    gamesOffered: 'Sports, Casino, Aviator, Lucky Numbers',
    winRate: '98%',
    wagering: 'N/A',
    badge: 'Rising pick',
    playNowUrl: 'https://www.easybet.co.za/',
    paymentMethods,
    layout: [
      {
        blockType: 'reviewScoreboard' as const,
        eyebrowIcon: 'star' as const,
        tocLabel: 'Overview',
        anchorId: 'overview',
        eyebrow: 'Our verdict at a glance',
        heading: 'How EasyBet scores',
        intro:
          'EasyBet does not have decades of brand history behind it, but it has moved quickly to build a platform that covers the things South African bettors actually care about: two local provincial licences, a welcome package with multiple starting points, a data-free app, weekly cashback, and a broad casino lobby. We registered an account, completed FICA, claimed the sign-up bonus, deposited, placed bets, and requested a withdrawal. Here is how each part held up.',
        summary: 'A fast-moving, dual-licensed SA platform with a layered welcome package and a genuinely useful data-free app.',
        testedLabel: 'Tested with real money',
        stats: [
          { label: 'Overall rating', value: '4.3/5' },
          { label: 'Win rate', value: '98%' },
        ],
        categories: [
          { icon: 'shield' as const, title: 'Licensing & safety', description: 'Dual SA licences (WCGRB & ECGB), FICA checks', score: 4.6 },
          { icon: 'trophy' as const, title: 'Sports markets & odds', description: '30+ sports, 12,000+ events on a typical day', score: 4.2 },
          { icon: 'wallet' as const, title: 'Payments & payouts', description: '8 deposit methods, withdrawals in 1–2 days', score: 4.2 },
          { icon: 'gift' as const, title: 'Bonuses & promotions', description: 'Layered welcome package plus weekly cashback', score: 4.6 },
          { icon: 'gamepad' as const, title: 'Casino & live games', description: '1,000+ games from 20 providers', score: 4.3 },
          { icon: 'smartphone' as const, title: 'Mobile app', description: 'iOS, Android APK, Huawei AppGallery, data-free APK', score: 4.5 },
          { icon: 'headphones' as const, title: 'Customer support', description: '24/7 live chat, email and weekday phone support', score: 4.3 },
        ],
        highlightsHeading: 'Highlights',
        highlights: [
          { text: 'Dual South African bookmaker licences' },
          { text: 'No-deposit bonus plus a layered welcome package' },
          { text: 'Data-free betting app on major SA networks' },
          { text: 'Weekly cashback across sports, Lucky Numbers, slots and Aviator' },
        ],
      },
      {
        blockType: 'reviewFactGrid' as const,
        eyebrowIcon: 'listChecks' as const,
        tocLabel: 'Quick facts',
        anchorId: 'facts',
        tinted: true,
        eyebrow: 'Quick facts',
        heading: 'EasyBet at a glance',
        columns: '2' as const,
        showPaymentMethods: true,
        paymentsLabel: 'Payment methods',
        facts: [
          { label: 'Welcome bonus', value: 'R50 Sign Up Bonus + 25 Free Spins, 150% up to R5,000, R500 First Bet Match, Aviator Welcome Bonus' },
          { label: 'Win rate / Payout speed', value: '98% · Instant' },
          {
            label: 'Licence',
            value: 'Western Cape Gambling and Racing Board (10191733-003) & Eastern Cape Gambling Board (ECBM 029)',
          },
          { label: 'Apps', value: 'iOS, Android APK, Huawei AppGallery, data-free APK' },
          { label: 'Currency', value: 'ZAR only' },
          { label: 'Live streaming', value: 'Not available' },
        ],
      },
      {
        blockType: 'reviewProsCons' as const,
        eyebrowIcon: 'scale' as const,
        tocLabel: 'Pros & cons',
        anchorId: 'pros-cons',
        eyebrow: 'What we like, and what we don’t',
        heading: 'EasyBet pros and cons',
        prosTitle: 'Pros',
        pros: [
          { text: 'Licensed locally by two South African gambling authorities, a stronger regulatory profile than many newer operators' },
          { text: 'Welcome package includes multiple offers, not just one first-deposit bonus' },
          { text: 'R50 no-deposit bonus and 25 Free Spins with the correct promo code at registration' },
          { text: 'Data-free APK lets players check odds, bet on sports and manage deposits without using mobile data' },
          { text: 'Casino lobby with 1,000+ games from providers like Pragmatic Play, NetEnt, Red Tiger and Evolution' },
          { text: 'Sportsbook covers 30+ sports and thousands of events, including SA football, rugby and cricket' },
          { text: 'Weekly cashback across sports, Lucky Numbers, slots and Evolution game shows' },
          { text: 'EasyUp Early Payout, multibet boosts, Losing Leg Insurance and Cash Out add real betting value' },
        ],
        consTitle: 'Cons',
        cons: [
          { text: 'Live betting is limited mainly to football, cricket, tennis and table tennis' },
          { text: 'No live streaming of sports events' },
          { text: 'Fewer withdrawal options than deposit options' },
          { text: 'The 150% First Deposit Match must be claimed manually via live chat or email' },
          { text: 'No dedicated VIP or tier-based loyalty programme' },
          { text: 'Phone support is not 24/7, though live chat is' },
          { text: 'Newer brand than long-established names like Hollywoodbets' },
        ],
      },
      {
        blockType: 'reviewSplit' as const,
        eyebrowIcon: 'shield' as const,
        tocLabel: 'Safe & legal?',
        anchorId: 'safety',
        eyebrow: 'Licence & safety',
        heading: 'Is EasyBet safe and legal in South Africa?',
        lead: 'Yes.',
        body: 'EasyBet is operated by Easybet Group EC (Pty) Ltd and holds bookmaker licences from two provincial regulators. The site runs in ZAR only, supports local payment methods, and follows FICA requirements before withdrawals are processed, alongside 18+ age enforcement and identity verification.',
        highlight: {
          icon: 'lock' as const,
          label: 'Licence references',
          value: '10191733-003 · ECBM 029',
          caption: 'Western Cape Gambling and Racing Board & Eastern Cape Gambling Board',
        },
        cards: [
          { icon: 'wallet' as const, title: 'Deposit limits', text: 'Set daily, weekly or monthly limits to control how much you deposit.' },
          { icon: 'timer' as const, title: 'Cool-off periods', text: 'Take a temporary break from betting for a set period.' },
          { icon: 'ban' as const, title: 'Self-exclusion', text: 'Restrict or close access to your account if gambling becomes harmful.' },
          { icon: 'idCard' as const, title: 'FICA verification', text: 'Identity and address checks help ensure accounts are legitimate.' },
        ],
      },
      {
        blockType: 'reviewBonus' as const,
        eyebrowIcon: 'gift' as const,
        tocLabel: 'Bonuses',
        anchorId: 'bonuses',
        eyebrow: 'Bonuses & promotions',
        heading: 'EasyBet welcome bonus and weekly offers',
        tag: 'Welcome bonus',
        title: '150% First Deposit Match up to R5,000',
        description:
          'New players can also claim a R50 Sign Up Bonus + 25 Free Spins with no deposit, a R500 First Bet Match, and an Aviator Welcome Bonus of up to 10 Bonus Flights.',
        rows: [
          { label: 'Match', value: '150% up to R5,000' },
          { label: 'Min deposit', value: 'R20' },
          { label: 'Sports / Lucky Numbers rollover', value: '4× deposit value at odds 2.0+' },
          { label: 'Free spins route', value: 'Up to 100 Free Spins on selected Pragmatic Play slots' },
          { label: 'How to claim', value: 'Contact live chat or email after depositing' },
          { label: 'Max withdrawal from bonus', value: 'R10,000' },
        ],
        calculator: {
          enabled: true,
          currency: 'R',
          matchPercent: 150,
          maxBonus: 5000,
          minDeposit: 20,
          maxDeposit: 3500,
          step: 10,
          defaultDeposit: 1000,
          sportsRollover: 4,
          casinoRollover: 40,
          tip: 'rollover terms vary by bonus route - this calculator uses the Sports / Lucky Numbers route (4× deposit value at odds 2.0+).',
        },
      },
      {
        blockType: 'reviewCards' as const,
        attachToPrevious: true,
        anchorId: 'weekly-offers',
        columns: '4' as const,
        variant: 'card' as const,
        items: [
          { tag: 'Sports & Lucky Numbers', title: 'Weekly Cashback', text: 'Credited every Thursday at 12PM: 15% back on net losses of R500+, 10% on R99–R499. 1× wagering, valid 5 days.' },
          { tag: 'Multis', title: 'Multibet Win Boost', text: 'Boosts of up to 1000% on qualifying accumulator wins - the more legs, the higher the potential boost.' },
          { tag: 'Multis', title: 'Losing Leg Insurance', text: 'A safety net on larger accumulators: if one leg lets the bet down, part or all of the stake may be refunded.' },
          { tag: 'Aviator', title: 'Aviator Welcome Bonus', text: 'Up to 10 Bonus Flights worth R2 each on a first deposit of R50+, paid as real money with no rollover.' },
        ],
      },
      {
        blockType: 'reviewSteps' as const,
        eyebrowIcon: 'userPlus' as const,
        tocLabel: 'How to join',
        anchorId: 'register',
        tinted: true,
        eyebrow: 'Registration',
        heading: 'How to join EasyBet',
        image: media['easybet-registration.jpg'],
        caption: 'FICA verification early avoids withdrawal delays later.',
        steps: [
          { title: 'Click JOIN', text: 'Find the yellow button on the EasyBet homepage.' },
          { title: 'Verify by SMS', text: 'Enter your mobile number and complete the OTP step.' },
          { title: 'Enter your details', text: 'Email, password, date of birth and SA ID or passport number.' },
          { title: 'Add your promo code', text: 'Enter it during the second step for the full R50 Sign Up Bonus.' },
          { title: 'Accept the terms', text: 'Confirm you are 18+ and create your account.' },
          { title: 'Complete FICA', text: 'Upload your ID and proof of address, then wait for approval.' },
          { title: 'Deposit and claim', text: 'Deposit, then contact live chat or email to request the 150% match.' },
        ],
      },
      {
        blockType: 'reviewTabsGallery' as const,
        eyebrowIcon: 'monitor' as const,
        tocLabel: 'Site & app',
        anchorId: 'experience',
        eyebrow: 'User experience',
        heading: 'Website design and mobile app',
        intro: 'A bold yellow, black and dark grey interface built around fast access to sports, casino games, Aviator, Lucky Numbers, BetGames and Spin & Win.',
        tabs: [
          {
            label: 'Design & navigation',
            icon: 'monitor' as const,
            image: media['easybet-user.jpg'],
            caption: 'A casino-heavy homepage with a rotating hero banner and quick category tabs.',
          },
          {
            label: 'Desktop vs mobile',
            icon: 'smartphone' as const,
            image: media['easybet-desk-mobile.jpg'],
            caption: 'Desktop suits browsing multiple markets; mobile and the data-free app suit quick betting.',
          },
        ],
      },
      {
        blockType: 'reviewCards' as const,
        attachToPrevious: true,
        anchorId: 'mobile-app',
        columns: '3' as const,
        variant: 'plain' as const,
        items: [
          { icon: 'smartphone' as const, title: 'iOS & Android', text: 'iOS from the App Store; Android installs as an APK from the site.' },
          { icon: 'sparkles' as const, title: 'Huawei AppGallery', text: 'Huawei users get their own app listing.' },
          { icon: 'zap' as const, title: 'Data-free APK', text: 'Zero-rated on Vodacom, MTN, Cell C and Telkom for sports betting and odds checking (casino not included).' },
        ],
      },
      {
        blockType: 'reviewShowcase' as const,
        eyebrowIcon: 'trophy' as const,
        tocLabel: 'Sports betting',
        anchorId: 'sports',
        eyebrow: 'Sports betting',
        heading: '30+ sports with EasyUp Early Payout',
        intro: 'Over 12,000 events on a typical day. Local coverage includes PSL football, Currie Cup and international rugby, and SA domestic and international cricket, alongside the big European football leagues.',
        columns: '3' as const,
        chips: [
          { text: 'Football' }, { text: 'Rugby' }, { text: 'Cricket' }, { text: 'Tennis' }, { text: 'Basketball' },
          { text: 'eSports' }, { text: 'Golf' }, { text: 'MMA' }, { text: 'Boxing' }, { text: 'Darts' }, { text: 'Table Tennis' },
        ],
      },
      {
        blockType: 'reviewCards' as const,
        attachToPrevious: true,
        anchorId: 'live-betting',
        columns: '1' as const,
        variant: 'row' as const,
        items: [
          { icon: 'zap' as const, title: 'Bet types & features', text: 'Match result, handicaps, totals, outrights and accumulators, plus Bet Builder and EasyUp Early Payout on selected football markets.' },
          { icon: 'zap' as const, title: 'Odds quality', text: 'Acceptable for the SA market rather than market-leading; best combined with the Multibet Win Boost and cashback promos.' },
          { icon: 'zap' as const, title: 'Live betting', text: 'In-play markets mainly on football, cricket, tennis and table tennis, with real-time price updates.' },
          { icon: 'zap' as const, title: 'Betting limits', text: 'Stake limits vary by sport, market and account status; Cash Out availability depends on live pricing and market status.' },
        ],
        callout: {
          tone: 'warning' as const,
          icon: 'info' as const,
          title: 'Heads up:',
          text: 'in-play betting is supported, but EasyBet doesn’t stream sport - there is no live video for football, rugby, cricket or tennis.',
        },
      },
      {
        blockType: 'reviewShowcase' as const,
        eyebrowIcon: 'gamepad' as const,
        tocLabel: 'Casino',
        anchorId: 'casino',
        tinted: true,
        eyebrow: 'Casino',
        heading: 'Easy Spins, crash games and live dealers',
        intro: 'The homepage puts casino content front and centre, with large game rows, category filters, crash games, slots, live dealer and game shows.',
        image: media['easybet-casino.jpg'],
        caption: 'Providers known for publishing RTP data include Pragmatic Play, NetEnt, Red Tiger and Big Time Gaming.',
        columns: '3' as const,
        chips: [
          { text: 'Easy Spins' }, { text: 'Live Dealer' }, { text: 'Aviator' }, { text: 'Lucky Numbers' }, { text: 'Horse Racing' },
          { text: 'BetGames' }, { text: 'Spin & Win' }, { text: 'Hot Slots' }, { text: 'Crash Games' }, { text: 'Game Shows' },
        ],
        lists: [
          {
            title: 'Popular games',
            items: [
              { text: 'Sweet Bonanza' }, { text: 'Gates of Olympus' }, { text: 'Sugar Rush' }, { text: 'Wolf Gold' },
              { text: 'Lucky Lightning' }, { text: 'Crazy Time' }, { text: 'Lightning Roulette' },
            ],
          },
          {
            title: 'Providers',
            items: [
              { text: 'Pragmatic Play' }, { text: 'NetEnt' }, { text: 'Red Tiger' }, { text: 'Big Time Gaming' },
              { text: 'Evolution' }, { text: 'Yggdrasil' }, { text: 'Spribe' },
            ],
          },
        ],
      },
      {
        blockType: 'reviewPayments' as const,
        eyebrowIcon: 'wallet' as const,
        tocLabel: 'Payments',
        anchorId: 'banking',
        eyebrow: 'Deposits & withdrawals',
        heading: 'EasyBet payment methods',
        intro: 'EasyBet operates in ZAR only. Deposits are generally instant; withdrawals need FICA and usually take 1–2 business days. Crypto is not supported.',
        note: 'Min deposit from R5',
        initialVisible: 8,
        tabs: [
          {
            label: 'Deposits',
            timeHeading: 'Deposit time',
            rows: [
              { name: 'OZOW / EasyBet Instant EFT', icon: media['payment2.png'], type: 'Instant EFT', minimum: 'R5', time: 'Instant', fee: 'Free' },
              { name: 'Visa / Mastercard', icon: media['payment1.png'], type: 'Card', minimum: 'R5', time: 'Instant', fee: 'Free' },
              { name: 'OTT Voucher', icon: media['payment13.png'], type: 'Voucher', minimum: 'R5', time: 'Instant', fee: 'Free' },
              { name: 'Blu Voucher', icon: media['blu-pay.png'], type: 'Voucher', minimum: 'R5', time: 'Instant', fee: 'Free' },
              { name: '1Voucher', icon: media['payment12.png'], type: 'Voucher', minimum: 'R5', time: 'Instant', fee: 'Free' },
              { name: 'Easyload', icon: media['easy-pay.png'], type: 'Voucher', minimum: 'R5', time: 'Instant', fee: 'Free' },
              { name: 'SnapScan', icon: media['snap-pay.png'], type: 'eWallet / QR', minimum: 'R5', time: 'Instant', fee: 'Free' },
              { name: 'Direct Bank Transfer', icon: media['payment4.png'], type: 'Bank Transfer', minimum: 'R20', time: '1–3 business days', fee: 'Free' },
            ],
          },
          {
            label: 'Withdrawals',
            timeHeading: 'Withdrawal time',
            rows: [
              { name: 'OZOW', icon: media['payment2.png'], type: 'Bank transfer / Instant EFT', minimum: 'R50', time: '1–2 business days', fee: 'Free' },
              { name: 'Instant Money', icon: media['payment3.png'], type: 'eWallet', minimum: 'R50', time: '1–2 business days', fee: 'Free' },
              { name: 'OTT eWallet', icon: media['payment11.png'], type: 'eWallet / Voucher Payout', minimum: 'R50', time: '1–2 business days', fee: 'Free' },
            ],
          },
        ],
      },
      {
        blockType: 'reviewCards' as const,
        eyebrowIcon: 'headphones' as const,
        tocLabel: 'Support',
        anchorId: 'support',
        tinted: true,
        eyebrow: 'Customer support',
        heading: 'Help is available every day',
        columns: '4' as const,
        variant: 'contact' as const,
        items: [
          { icon: 'message' as const, tag: 'Live chat', title: '24/7', text: 'On the site, the strongest support channel' },
          { icon: 'mail' as const, tag: 'Email', title: 'help@easybet.co.za', text: 'FICA docs: fica@easybet.co.za' },
          { icon: 'phone' as const, tag: 'Phone', title: '+27 60 013 1391', text: 'Monday to Friday, 8AM–4PM' },
          { icon: 'languages' as const, tag: 'Language', title: 'English', text: 'South African agents' },
        ],
        callout: {
          tone: 'success' as const,
          icon: 'lifebuoy' as const,
          title: 'Responsible gambling at EasyBet',
          text: 'Set deposit limits, take a cool-off or self-exclude from your account settings. Free, confidential help: National Responsible Gambling Programme, 0800 006 008 or WhatsApp 076 675 0710.',
        },
      },
      {
        blockType: 'reviewCompare' as const,
        eyebrowIcon: 'scale' as const,
        tocLabel: 'vs Hollywoodbets',
        anchorId: 'compare',
        eyebrow: 'Head to head',
        heading: 'EasyBet vs Hollywoodbets',
        opponent: opponentId,
        opponentShortName: 'HWB',
        badge: 'Our pick',
        summary: 'Hollywoodbets has stronger brand recognition and a longer track record; EasyBet counters with dual SA licences and a data-free app.',
        rows: [
          { kind: 'bonus' as const, label: 'Welcome bonus', winner: 'ours' as const },
          { kind: 'rating' as const, label: 'Rating', winner: 'tie' as const },
        ],
      },
      {
        blockType: 'reviewVerdict' as const,
        tocLabel: 'Verdict',
        anchorId: 'verdict',
        eyebrow: 'Final verdict',
        heading: 'Is EasyBet worth it? Yes, with a few gaps.',
        body: 'EasyBet is a licensed South African sportsbook and casino that covers the core things local players need: ZAR operation, familiar payment methods, FICA verification, two provincial licences, and a welcome package with more layers than most competitors at this level. Regular players get weekly cashback across sports, Lucky Numbers, slots and Aviator, plus multibet boosts and EasyUp Early Payout, and the data-free app is a genuinely useful feature. The real gaps are a thin set of withdrawal methods, no VIP programme, and live betting limited to four sports - EasyBet suits players who want a regulated SA platform with a strong welcome package and data-free mobile access, less so players who need broad live betting or crypto support.',
        secondaryLabel: 'See payment methods',
        secondaryHref: '#banking',
      },
      {
        blockType: 'reviewFaq' as const,
        eyebrowIcon: 'sparkles' as const,
        tocLabel: 'FAQs',
        anchorId: 'faq',
        eyebrow: 'FAQs',
        heading: 'EasyBet questions, answered',
        items: [
          { question: 'Is EasyBet legal in South Africa?', answer: 'Yes. EasyBet is operated by Easybet Group EC (Pty) Ltd and is licensed by the Western Cape Gambling and Racing Board (licence 10191733-003) and the Eastern Cape Gambling Board (licence ECBM 029).' },
          { question: 'What welcome bonuses does EasyBet offer?', answer: 'A R50 Sign Up Bonus plus 25 Free Spins with a promo code, a 150% First Deposit Match up to R5,000, a R500 First Bet Match, and an Aviator Welcome Bonus of up to 10 Bonus Flights on a first deposit of R50 or more.' },
          { question: 'Does EasyBet offer a no-deposit bonus?', answer: 'Yes. New players receive R50 plus 25 Free Spins with a promo code at registration, no deposit required. Without a code, EasyBet automatically credits R25 and 25 Free Spins on the same terms.' },
          { question: 'How do I claim the 150% First Deposit Match?', answer: 'Complete registration and FICA verification, then make a qualifying first deposit of at least R20. Contact EasyBet via live chat or email to request the bonus manually after depositing.' },
          { question: 'Does EasyBet have a mobile app?', answer: 'Yes. An iOS app on the App Store, an Android APK, a Huawei AppGallery app, a mobile browser version, and a separate data-free APK for betting without mobile data.' },
          { question: 'What is the EasyBet data-free app?', answer: 'The data-free APK is zero-rated on Vodacom, MTN, Cell C and Telkom, so no mobile data is used for sports betting, odds checking, match updates and deposits. Casino games are not available in data-free mode.' },
          { question: 'What payment methods can I use?', answer: 'Deposits: OZOW / EasyBet Instant EFT, Visa, Mastercard, OTT Voucher, Blu Voucher, 1Voucher, Easyload, SnapScan and Direct Bank Transfer. Withdrawals: OZOW, Instant Money and OTT eWallet. Minimum withdrawal is R50. EasyBet does not support crypto.' },
          { question: 'How long do withdrawals take?', answer: 'Withdrawals generally take 1 to 2 business days. FICA verification must be completed first, and your first withdrawal must go through OZOW or EFT to a verified bank account.' },
          { question: 'Does EasyBet offer live betting?', answer: 'Yes, mainly on football, cricket, tennis and table tennis. Live streaming of sports events is not available at EasyBet.' },
          { question: 'Does EasyBet have responsible gambling tools?', answer: 'Yes. Deposit limits, cool-off periods, self-exclusion and session reminders. The National Responsible Gambling Programme helpline is free on 0800 006 008 or WhatsApp 076 675 0710, 24 hours a day.' },
        ],
      },
    ],
    meta: {
      description: 'An in-depth EasyBet review: licensing, the layered welcome bonus, sports and casino offering, payment methods, and whether it is worth it for South African players.',
      title: 'EasyBet Review 2026 | SouthAfricanBet.co.za',
    },
    _status: 'published' as const,
  }

  const existing = await payload.find({ collection: 'reviews', limit: 1, where: { slug: { equals: 'easybet' } } })
  if (existing.docs[0]) {
    await payload.update({ collection: 'reviews', id: existing.docs[0].id, data, context: ctx })
    payload.logger.info(`Updated easybet review (id ${existing.docs[0].id})`)
  } else {
    await payload.create({ collection: 'reviews', data: { ...data, slug: 'easybet', title: 'EasyBet', rating: 4.3 }, context: ctx })
    payload.logger.info('Created easybet review')
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
