/**
 * Seeds the four legal/policy pages (Disclaimer, Terms & Conditions, Privacy Policy,
 * Cookies Policy) using the Legal Hero (badge + heading + meta row + "at a glance" tiles)
 * and the Legal Sections block (numbered cards with bullet points, an optional helpline
 * callout, and an optional contact-chip row) - following the reference design the user
 * supplied, without the sticky "on this page" nav or the "related legal pages" band.
 *
 * Re-runnable: looked up by slug and updated in place.
 *
 *   npx tsx scripts/seed-legal.ts
 */
import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const ctx = { disableRevalidate: true }

const text = (t: string) => ({ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: t, version: 1 })

const p = (t: string) => ({
  type: 'paragraph',
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  children: [text(t)],
})

const doc = (t: string) => ({
  root: { type: 'root', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1, children: [p(t)] },
})

const UPDATED = 'Last updated: 20 November 2026'
const CONTACT = { email: 'support@southafricanbet.co.za', website: 'www.southafricanbet.co.za' }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icon = (name: string) => name as any

const point = (t: string) => ({ text: t })
const glance = (iconName: string, title: string, subtitle: string) => ({ icon: icon(iconName), title, subtitle })

type LegalPage = {
  glanceTiles: ReturnType<typeof glance>[]
  intro: string
  metaDescription: string
  readInfo: string
  sections: Record<string, unknown>[]
  slug: string
  title: string
}

const PAGES: LegalPage[] = [
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    intro:
      'The information provided on SouthAfricanBet.co.za is intended for general information, entertainment and educational purposes only. By using our website, you acknowledge and agree to the following.',
    metaDescription:
      'Read the SouthAfricanBet.co.za disclaimer: we are an independent review site, not a bookmaker, and do not offer betting or financial advice.',
    readInfo: '8 sections · about 3 min read',
    glanceTiles: [
      glance('ban', "We're not a bookmaker", 'We never take bets or payments.'),
      glance('fileText', 'Offers can change', 'Always confirm with the operator.'),
      glance('piggyBank', 'Not financial advice', 'Your bets are your decisions.'),
      glance('lifebuoy', '18+ and play safe', 'Help: 0800 006 008'),
    ],
    sections: [
      {
        icon: icon('ban'),
        heading: 'No gambling services',
        points: [
          point('SouthAfricanBet.co.za does not operate as an online casino, bookmaker or gambling provider.'),
          point('We do not accept or process bets, wagers or payments of any kind.'),
          point('Our website offers reviews, tips, strategies and news for informational purposes only.'),
        ],
      },
      {
        icon: icon('fileText'),
        heading: 'Accuracy of information',
        points: [
          point('We make every effort to ensure that the information on SouthAfricanBet.co.za is accurate and up to date.'),
          point('However, we do not guarantee that all information is error-free, complete or current.'),
          point(
            'Betting odds, bonuses and promotions listed on our site may change without notice. Always confirm details directly with the bookmaker or casino.',
          ),
        ],
      },
      {
        icon: icon('piggyBank'),
        heading: 'No financial advice',
        points: [
          point('Content on SouthAfricanBet.co.za should not be considered financial or investment advice.'),
          point('Betting and gambling involve risk, and outcomes are never guaranteed.'),
          point('You are solely responsible for any betting or gambling decisions you make based on the content provided.'),
        ],
      },
      {
        icon: icon('triangleAlert'),
        heading: 'Risk of gambling',
        points: [
          point('Gambling can be addictive and may result in financial loss.'),
          point('We encourage all users to gamble responsibly and only with money they can afford to lose.'),
          point('If you believe you may have a gambling problem, please seek help immediately.'),
        ],
        helpline: {
          title: 'National Responsible Gambling Programme (NRGP)',
          subtitle: 'Free, confidential help, 24 hours a day.',
          value: '0800 006 008',
          linkLabel: 'responsiblegambling.org.za',
          linkUrl: 'https://responsiblegambling.org.za',
        },
      },
      {
        icon: icon('externalLink'),
        heading: 'Third-party websites',
        points: [
          point('Our website contains links to third-party websites, including casinos and betting operators.'),
          point('We are not responsible for the content, security or practices of these external websites.'),
          point(
            'Accessing third-party websites is done at your own risk, and you should always read their terms and conditions.',
          ),
        ],
      },
      {
        icon: icon('scale'),
        heading: 'Limitation of liability',
        points: [
          point(
            'To the fullest extent permitted by South African law, SouthAfricanBet.co.za accepts no responsibility for any loss, damage or consequences arising from the use of our website.',
          ),
          point('This includes reliance on our tips, reviews, guides or any linked third-party websites.'),
        ],
      },
      {
        icon: icon('shield'),
        heading: 'Use at your own risk',
        text: 'By using SouthAfricanBet.co.za, you agree that all information is provided "as is" and at your own risk.',
      },
      {
        icon: icon('mail'),
        heading: 'Contact us',
        text: 'If you have any questions about this Disclaimer, please contact us.',
        contact: CONTACT,
      },
    ],
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    intro:
      'These terms and conditions govern your use of SouthAfricanBet.co.za. By accessing or using this website, you agree to them in full.',
    metaDescription:
      'The terms and conditions for using SouthAfricanBet.co.za, our independent South African betting and casino review website.',
    readInfo: '9 sections · about 4 min read',
    glanceTiles: [
      glance('ban', 'Independent site', 'Not a bookmaker or casino.'),
      glance('idCard', '18+ only', 'The legal SA gambling age.'),
      glance('banknote', 'Affiliate links', 'We may earn a commission.'),
      glance('scale', 'SA law applies', 'Governs these terms.'),
    ],
    sections: [
      {
        icon: icon('info'),
        heading: 'Who we are',
        text: 'SouthAfricanBet.co.za ("we", "us", "our") publishes independent reviews, guides and news about online sports betting and casino operators available to South African players. We are a media and information website, not a bookmaker, casino or gambling operator.',
      },
      {
        icon: icon('check'),
        heading: 'Acceptance of these terms',
        text: 'By accessing or using this website, you confirm that you are at least 18 years old and agree to be bound by these terms. If you do not agree, please do not use the site.',
      },
      {
        icon: icon('shield'),
        heading: 'Use of this website',
        points: [
          point('You may not attempt to gain unauthorised access to our systems or data.'),
          point('You may not copy, scrape or republish our content without permission.'),
          point('You may not use the site to distribute malware, spam or unlawful content.'),
          point('You may not interfere with the normal operation of the website.'),
        ],
      },
      {
        icon: icon('fileText'),
        heading: 'Intellectual property',
        text: 'All text, graphics, logos and other content on this website, except third-party trademarks and logos used for identification purposes, belong to SouthAfricanBet.co.za or our licensors and may not be reproduced without written permission.',
      },
      {
        icon: icon('banknote'),
        heading: 'Affiliate disclosure',
        points: [
          point('We participate in affiliate programmes with licensed bookmakers and casinos.'),
          point('We may earn a commission when you click an affiliate link and register with an operator.'),
          point('This never costs you anything extra, and it never influences our ratings or recommendations.'),
        ],
      },
      {
        icon: icon('externalLink'),
        heading: 'No liability for third-party operators',
        text: "We do not control, and are not responsible for, the products, services, promotions or conduct of any bookmaker, casino or other third party featured on this website. Any dispute about a deposit, withdrawal, bonus or account must be raised directly with that operator.",
      },
      {
        icon: icon('scale'),
        heading: 'Limitation of liability',
        text: 'To the fullest extent permitted by law, we exclude all liability for any direct, indirect or consequential loss arising from your use of this website or any third-party site linked from it.',
      },
      {
        icon: icon('pencil'),
        heading: 'Changes & governing law',
        points: [
          point('We may update these terms from time to time. Changes are posted on this page with a new "Last updated" date.'),
          point('Continued use of the site after changes are posted means you accept the revised terms.'),
          point('These terms are governed by the laws of the Republic of South Africa.'),
        ],
      },
      {
        icon: icon('mail'),
        heading: 'Contact us',
        text: 'For any questions about these terms, please get in touch.',
        contact: CONTACT,
      },
    ],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    intro:
      'This policy explains what personal information SouthAfricanBet.co.za collects, how we use it, and the choices and rights you have.',
    metaDescription:
      "SouthAfricanBet.co.za's privacy policy: what information we collect, how it's used, and your rights under South Africa's POPIA.",
    readInfo: '9 sections · about 4 min read',
    glanceTiles: [
      glance('lock', 'Data kept secure', 'Reasonable technical safeguards.'),
      glance('ban', 'Never sold', 'We do not sell your data.'),
      glance('scale', 'POPIA rights', 'Access, correct or delete your data.'),
      glance('idCard', '18+ only', 'Not for under-18s.'),
    ],
    sections: [
      {
        icon: icon('fileText'),
        heading: 'Information we collect',
        points: [
          point(
            'Information you give us directly, such as your name and email address when you use our Contact Us form or subscribe to our newsletter.',
          ),
          point(
            'Automatically collected information, such as your IP address, browser type, device and pages visited, via cookies and analytics tools.',
          ),
          point('Information about which bookmaker links you click, so we can measure which offers are useful to our readers.'),
        ],
      },
      {
        icon: icon('listChecks'),
        heading: 'How we use your information',
        points: [
          point('Respond to your enquiries and send the newsletter you signed up for.'),
          point('Understand how visitors use our site, so we can improve our content.'),
          point('Detect and prevent fraud, abuse and security issues.'),
          point('Comply with our legal obligations.'),
        ],
      },
      {
        icon: icon('monitor'),
        heading: 'Cookies',
        text: 'We use cookies and similar technologies for essential site functionality, analytics and affiliate tracking. You can control cookies through your browser settings. See our Cookies Policy for full details.',
      },
      {
        icon: icon('externalLink'),
        heading: 'Third-party links',
        text: 'Our site links to third-party bookmakers, casinos and other websites. We are not responsible for the privacy practices of those sites, and we encourage you to read their privacy policies before sharing any personal information with them.',
      },
      {
        icon: icon('lock'),
        heading: 'Data security',
        text: 'We take reasonable technical and organisational measures to protect the personal information we hold from loss, misuse or unauthorised access. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.',
      },
      {
        icon: icon('scale'),
        heading: 'Your rights under POPIA',
        points: [
          point("Under South Africa's Protection of Personal Information Act (POPIA), you can ask to access your personal information."),
          point('You can ask us to correct or delete your personal information.'),
          point('You can object to, or ask us to restrict, certain processing of your information.'),
        ],
      },
      {
        icon: icon('idCard'),
        heading: "Children's privacy",
        text: 'This website is intended for users aged 18 and older, in line with the legal gambling age in South Africa. We do not knowingly collect personal information from anyone under 18.',
      },
      {
        icon: icon('pencil'),
        heading: 'Changes to this policy',
        text: 'We may update this privacy policy from time to time. Any changes will be posted on this page with a new "Last updated" date.',
      },
      {
        icon: icon('mail'),
        heading: 'Contact us',
        text: 'If you have questions about this privacy policy or how we handle your data, please contact us.',
        contact: CONTACT,
      },
    ],
  },
  {
    slug: 'cookies-policy',
    title: 'Cookies Policy',
    intro: 'This policy explains what cookies are, which ones we use on SouthAfricanBet.co.za, and how you can control them.',
    metaDescription:
      "SouthAfricanBet.co.za's cookies policy: the types of cookies we use, why we use them, and how to manage your preferences.",
    readInfo: '6 sections · about 2 min read',
    glanceTiles: [
      glance('monitor', 'Essential + analytics', 'Keep the site working well.'),
      glance('banknote', 'Affiliate tracking', 'Credits your bookmaker signup.'),
      glance('check', 'You stay in control', 'Manage cookies in your browser.'),
      glance('externalLink', 'Some are third-party', 'Set by our partners.'),
    ],
    sections: [
      {
        icon: icon('info'),
        heading: 'What are cookies',
        text: 'Cookies are small text files that a website saves on your device when you visit it. They help the site remember your preferences, understand how the site is used, and, in some cases, track referrals to our bookmaker and casino partners.',
      },
      {
        icon: icon('listChecks'),
        heading: 'How we use cookies',
        points: [
          point('Essential cookies - needed for the website to function correctly, such as remembering your cookie consent choice.'),
          point('Analytics cookies - help us understand how visitors use the site, so we can improve our content and navigation.'),
          point(
            'Affiliate tracking cookies - record when you click through to a bookmaker or casino, so that operator can attribute your signup to us.',
          ),
          point('Preference cookies - remember settings such as a dismissed newsletter banner.'),
        ],
      },
      {
        icon: icon('externalLink'),
        heading: 'Third-party cookies',
        text: 'Some cookies are placed by third-party services we use, such as analytics providers and our affiliate partners. We do not control these cookies directly; please refer to the relevant third party’s own cookie or privacy policy for details.',
      },
      {
        icon: icon('monitor'),
        heading: 'Managing cookies',
        text: 'Most browsers let you view, delete and block cookies through their settings. Blocking all cookies may affect how parts of this website function. You can find instructions for managing cookies in your browser’s help documentation.',
      },
      {
        icon: icon('pencil'),
        heading: 'Changes to this policy',
        text: 'We may update this cookies policy from time to time. Any changes will be posted on this page with a new "Last updated" date.',
      },
      {
        icon: icon('mail'),
        heading: 'Contact us',
        text: 'If you have questions about our use of cookies, please contact us.',
        contact: CONTACT,
      },
    ],
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  for (const legalPage of PAGES) {
    const data = {
      hero: {
        type: 'legalHero' as const,
        badge: 'Legal',
        headingLine1: legalPage.title,
        richText: doc(legalPage.intro),
        updatedLabel: UPDATED,
        readInfo: legalPage.readInfo,
        miniStats: legalPage.glanceTiles,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      layout: [{ blockType: 'legalSections' as const, sections: legalPage.sections as any }],
      meta: {
        title: `${legalPage.title} | SouthAfricanBet.co.za`,
        description: legalPage.metaDescription,
      },
      slug: legalPage.slug,
      title: legalPage.title,
      _status: 'published' as const,
    }

    const existing = await payload.find({ collection: 'pages', limit: 1, where: { slug: { equals: legalPage.slug } } })
    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context: ctx })
      payload.logger.info(`Updated ${legalPage.slug} page`)
    } else {
      await payload.create({ collection: 'pages', data, context: ctx })
      payload.logger.info(`Created ${legalPage.slug} page`)
    }
  }

  // ---- point the Footer's legal nav links at the real pages instead of "#" ----------------
  const footer = await payload.findGlobal({ slug: 'footer', depth: 0 })
  const LABEL_TO_SLUG: Record<string, string> = {
    Disclaimer: 'disclaimer',
    'Terms & Conditions': 'terms-conditions',
    'Privacy Policy': 'privacy-policy',
    'Cookies Policy': 'cookies-policy',
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navItems = ((footer as any).navItems || []).map((item: any) => {
    const slug = LABEL_TO_SLUG[item.link?.label]
    if (!slug) return item
    return { ...item, link: { ...item.link, url: `/${slug}` } }
  })
  await payload.updateGlobal({ slug: 'footer', data: { navItems }, context: ctx })
  payload.logger.info('Updated Footer legal nav links')

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
