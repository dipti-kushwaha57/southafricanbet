/**
 * Seeds the CMS content for the redesigned homepage (betting-v2.1 reference):
 * media (logos, payment logos, blog photos), bookmaker display fields, blog posts,
 * the header/footer globals and the `home` page layout.
 *
 * Copy comes from scripts/seed-assets/home-content.json (extracted from the reference).
 * Re-runnable: everything is looked up by slug/filename and updated in place.
 *
 *   npx tsx scripts/seed-design.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

const ASSETS = path.resolve(process.cwd(), 'scripts/seed-assets')
const content = JSON.parse(fs.readFileSync(path.join(ASSETS, 'home-content.json'), 'utf8'))
const ctx = { disableRevalidate: true }

const richText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    })),
  },
})

/** Maps the reference's absolute/anchor links onto this site's routes. */
const BOOKMAKERS = ['10bet', 'hollywoodbets', 'zarbet', 'luckyfish', 'yesplay', 'pantherbet', 'jabulabets']
const local = (url: string): string => {
  if (url === '#') return '/'
  if (url.startsWith('#')) return `/${url}`
  const match = url.match(/betting\.za\.com\/(.*?)\/?$/)
  if (!match) return url
  const segments = match[1].split('/')
  const last = segments[segments.length - 1]
  if (last.endsWith('-review')) return `/reviews/${last.replace(/-review$/, '')}`
  if (BOOKMAKERS.includes(last)) return `/reviews/${last}`
  if (segments[0] === 'news' || segments[0] === 'soccer-news') return `/posts/${last}`
  return `/${last}`
}
const link = (label: string, url: string, extra: Record<string, unknown> = {}) => ({
  type: 'custom' as const,
  label,
  url: local(url),
  ...extra,
})

async function run() {
  const payload = await getPayload({ config: configPromise })

  // ---- media -------------------------------------------------------------------------
  const media: Record<string, number> = {}
  const upload = async (file: string, alt: string) => {
    const existing = await payload.find({
      collection: 'media',
      limit: 1,
      where: { filename: { equals: file } },
    })
    if (existing.docs[0]) return (media[file] = existing.docs[0].id as number)
    const created = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: path.join(ASSETS, file),
    })
    return (media[file] = created.id as number)
  }

  await upload('logo-header.png', 'SouthAfricanBet.co.za')
  await upload('logo-footer.png', 'SouthAfricanBet.co.za')
  const PAYMENTS: [string, string][] = [
    ['pay-instant-eft.png', 'Instant EFT'],
    ['pay-eft-pay.png', 'EFT Pay'],
    ['pay-samsung-pay.png', 'Samsung Pay'],
    ['pay-cash-deposit.png', 'Cash deposit'],
    ['pay-send-money.png', 'Send money'],
    ['pay-topup.png', 'topUP'],
    ['pay-payu.png', 'PayU'],
    ['pay-1voucher.png', '1Voucher'],
    ['pay-peach-payments.png', 'Peach Payments'],
  ]
  for (const [file, name] of PAYMENTS) await upload(file, name)
  const BLOG_IMAGES = [
    'blog-kaizer-chiefs.jpg',
    'blog-gambling-tax.jpg',
    'blog-zarbucks.jpg',
    'blog-bettabets.jpg',
    'blog-brentford.jpg',
  ]
  for (let i = 0; i < BLOG_IMAGES.length; i++) await upload(BLOG_IMAGES[i], content.blog[i].title)
  payload.logger.info('Media ready')

  // ---- bookmakers ----------------------------------------------------------------------
  const BRAND_COLORS: Record<string, string> = {
    pantherbet: '#7c3aed',
    '10bet': '#0f172a',
    zarbet: '#111827',
    hollywoodbets: '#6d28d9',
    luckyfish: '#0e7490',
    yesplay: '#ea580c',
    jabulabets: '#16a34a',
    bettabets: '#ca8a04',
    apexbets: '#dc2626',
    betway: '#059669',
    supersportbet: '#b91c1c',
    sunbet: '#d97706',
    playabets: '#4338ca',
    easybet: '#0369a1',
  }
  const WIN_RATES = ['98%', '97%', '97%', '96%', '96%']
  const reviews = await payload.find({ collection: 'reviews', limit: 100, pagination: false, sort: 'rank' })
  for (const [index, review] of reviews.docs.entries()) {
    const topFive = index < 5
    await payload.update({
      collection: 'reviews',
      id: review.id,
      context: ctx,
      data: {
        badge: index === 0 ? "Editor's Choice" : null,
        brandColor: BRAND_COLORS[review.slug as string] ?? null,
        featured: true,
        features: [
          { text: 'Licensed by a provincial gambling board' },
          { text: 'Fast EFT & instant payouts' },
          { text: 'Rugby, PSL & cricket markets' },
        ],
        gamesOffered: 'Sports, Casino, Racing, Live',
        minDeposit: 'R10',
        paymentMethods: topFive ? PAYMENTS.map(([file, name]) => ({ name, icon: media[file] })) : [],
        payoutTime: '1–24 hrs',
        wagering: topFive ? 'N/A' : null,
        winRate: topFive ? WIN_RATES[index] : null,
      },
    })
  }
  payload.logger.info(`Updated ${reviews.docs.length} bookmakers`)

  // ---- blog ----------------------------------------------------------------------------
  const categoryIds: Record<string, number> = {}
  for (const title of ['Soccer', 'Latest News', 'Promotions']) {
    const existing = await payload.find({ collection: 'categories', limit: 1, where: { title: { equals: title } } })
    categoryIds[title] = (
      existing.docs[0] ??
      (await payload.create({
        collection: 'categories',
        data: { slug: title.toLowerCase().replace(/\s+/g, '-'), title },
        context: ctx,
      }))
    ).id as number
  }
  const postIds: number[] = []
  const POST_DATES = ['2026-10-17', '2026-10-16', '2026-10-15', '2026-10-14', '2026-08-20']
  for (const [i, article] of (content.blog as any[]).entries()) {
    const slug = article.href.replace(/\/$/, '').split('/').pop() as string
    const data = {
      _status: 'published' as const,
      categories: [categoryIds[article.category]],
      content: richText([article.description]),
      heroImage: media[BLOG_IMAGES[i]],
      meta: { description: article.description, title: article.title },
      publishedAt: new Date(`${POST_DATES[i]}T09:00:00.000Z`).toISOString(),
      slug,
      title: article.title,
    }
    const existing = await payload.find({ collection: 'posts', limit: 1, where: { slug: { equals: slug } } })
    const post = existing.docs[0]
      ? await payload.update({ collection: 'posts', id: existing.docs[0].id, data, context: ctx })
      : await payload.create({ collection: 'posts', data, context: ctx })
    postIds.push(post.id as number)
  }
  payload.logger.info('Blog posts ready')

  // ---- header / footer -------------------------------------------------------------------
  const ICONS: Record<string, string> = {
    '🏠': 'home',
    '🏆': 'trophy',
    '⚽': 'sports',
    '🎁': 'gift',
    '⭐': 'star',
    '🛡️': 'shield',
    '❓': 'help',
  }
  await payload.updateGlobal({
    slug: 'header',
    context: ctx,
    data: {
      ctaLink: link('Get Bonus', '#top'),
      helplineNumber: '0800 006 008',
      logo: media['logo-header.png'],
      navItems: (content.nav as any[]).map((item) => ({
        children: item.children.map((child: any) => ({ label: child.label, url: local(child.url) })),
        hasDropdown: item.children.length > 0,
        link: link(item.label, item.href, { icon: ICONS[item.emoji] ?? '' }),
      })),
      noticeText: 'Gambling can be addictive. Please play responsibly.',
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: ctx,
    data: {
      columns: (content.footerColumns as any[]).map((column) => ({
        navItems: column.links.map((l: any) => ({ link: link(l.label, l.url) })),
        title: column.title,
      })),
      copyright: content.copyright,
      description: content.footerDescription,
      helplineNumber: '0800 006 008',
      licensingAuthorities: (content.rg.pills as string[]).map((name) => ({ name })),
      logo: media['logo-footer.png'],
      navItems: (content.legal as any[]).map((l) => ({ link: link(l.label, l.url) })),
      newsletter: {
        buttonLabel: 'Subscribe',
        disclaimer: content.newsletter.text,
        heading: content.newsletter.eyebrow,
        text: content.newsletter.heading,
      },
      responsibleGamblingSubtext: content.rg.text,
      responsibleGamblingText: content.rg.title,
      socialLinks: (['facebook', 'x', 'youtube', 'linkedin'] as const).map((platform) => ({ platform, url: '#' })),
    },
  })
  payload.logger.info('Header and footer ready')

  // ---- home page ---------------------------------------------------------------------------
  const data: any = {
    _status: 'published',
    hero: {
      badge: 'Licensed by SA provincial boards',
      byline: 'Written by Dennis Kumar',
      bylineRole: 'Content Writer',
      headingHighlight: 'South Africa 2026',
      headingLine1: 'Online Sports Betting',
      headingLine2: 'Sites',
      links: [
        { link: link('List of Licensed Bookmakers', '#top', { appearance: 'default', icon: 'trophy' }) },
        {
          link: link('Get Verified Free Spins', 'https://www.betting.za.com/free-spins-casinos/', {
            appearance: 'outline',
            icon: 'gift',
          }),
        },
      ],
      richText: richText([content.heroIntro]),
      type: 'bettingHero',
      updatedText: 'Updated September 21, 2026',
    },
    layout: [
      {
        anchorId: 'top',
        blockType: 'reviewsBlock',
        eyebrow: 'Our rankings',
        heading: 'Best Sports Betting Sites in 2026',
        initialVisible: 5,
        intro: content.topIntro,
        limit: 14,
        source: 'featured',
        variant: 'card-grid',
      },
      {
        anchorId: 'how',
        blockType: 'featureGrid',
        callout: content.stepsCallout,
        eyebrow: 'Beginner guide',
        heading: 'How to Bet on Sports Betting Sites',
        intro: content.stepsIntro,
        items: content.steps,
        tinted: true,
        variant: 'steps',
      },
      {
        blockType: 'featureGrid',
        eyebrow: 'Methodology',
        heading: 'How Our Experts Review South African Betting Sites',
        intro: content.criteriaIntro,
        items: content.criteria,
        variant: 'criteria',
      },
      {
        anchorId: 'reviews',
        blockType: 'reviewsBlock',
        eyebrow: 'Hand-picked',
        heading: 'Top Online Sports Betting Sites in South Africa',
        intro: content.reviewsIntro,
        limit: 5,
        source: 'featured',
        tinted: true,
        variant: 'detailed-list',
      },
      {
        anchorId: 'legal',
        authorities: (content.authorities as string[]).map((name) => ({ name })),
        authoritiesHeading: "South Africa's Main Licensing Authorities",
        benefits: (content.benefits as string[]).map((text) => ({ text })),
        benefitsHeading: 'Why Licensing Matters',
        benefitsNote: content.benefitsNote,
        blockType: 'licensingBlock',
        eyebrow: 'Stay safe',
        heading: 'Legal and Licensed Bookmakers in South Africa',
        intro: content.legalIntro,
        proTip: content.legalProTip,
      },
      {
        anchorId: 'sports',
        blockType: 'featureGrid',
        eyebrow: 'Pick your game',
        heading: 'Best South African Sports to Bet On',
        intro: content.sportsIntro,
        items: content.sports,
        tinted: true,
        variant: 'sports',
      },
      {
        blockType: 'featureGrid',
        ctaHeading: content.ctaHeading,
        ctaLink: link('Claim My Bonus', content.ctaUrl),
        ctaText: content.ctaText,
        eyebrow: 'About us',
        heading: 'Why Trust SouthAfricanBet.co.za',
        intro: content.trustIntro,
        items: content.trust,
        quote: content.quote,
        variant: 'trust',
      },
      {
        anchorId: 'faq',
        blockType: 'faqBlock',
        ctaLink: link('Compare top bookmakers', '#top'),
        eyebrow: 'Questions',
        heading: 'Frequently Asked Questions',
        headingHighlight: 'Questions',
        intro: content.faqIntro,
        items: content.faq,
        quickLinks: (content.quickLinks as any[]).map((l) => ({ link: link(l.label, l.url) })),
        quickLinksHeading: 'Quick Explore',
        tinted: true,
      },
      {
        anchorId: 'blog',
        blockType: 'postsBlock',
        eyebrow: 'Latest articles',
        heading: 'From Our Betting Blog',
        headingHighlight: 'Betting Blog',
        intro: content.blogIntro,
        mode: 'selected',
        selectedPosts: postIds,
        viewAllLink: link('View all articles', '/posts'),
      },
    ],
    meta: {
      description: 'Compare licensed online sports betting sites in South Africa for 2026.',
      title: 'Online Sports Betting Sites South Africa 2026 | SouthAfricanBet.co.za',
    },
    slug: 'home',
    title: 'Home',
  }

  const existing = await payload.find({ collection: 'pages', limit: 1, where: { slug: { equals: 'home' } } })
  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context: ctx })
    payload.logger.info(`Updated home page (id ${existing.docs[0].id})`)
  } else {
    await payload.create({ collection: 'pages', data, context: ctx })
    payload.logger.info('Created home page')
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
