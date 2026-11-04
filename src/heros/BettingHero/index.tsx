import configPromise from '@payload-config'
import { Gift, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'

import type { Page } from '@/payload-types'

import { ReviewsBlockComponent } from '@/blocks/ReviewsBlock/Component'
import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'
import styles from './BettingHero.module.css'

/** Plain text of every paragraph in a Lexical state (the hero intro is a single <p>). */
const paragraphsOf = (richText: Page['hero']['richText']): string[] => {
  const children = (richText as any)?.root?.children || []
  return children
    .filter((node: any) => node.type === 'paragraph')
    .map((node: any) => (node.children || []).map((c: any) => c.text || '').join(''))
    .filter(Boolean)
}

const ICONS = { gift: Gift, trophy: Trophy } as const

/** Scrolling strip of every bookmaker's welcome offer (the list is doubled for a seamless loop). */
const OfferTicker: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'reviews',
    depth: 0,
    limit: 20,
    pagination: false,
    select: { bonusText: true, title: true },
    sort: 'rank',
  })

  if (!docs.length) return null

  return (
    <div className={styles.ticker}>
      <div className={cn('animate-marquee', styles.tickerTrack)}>
        {[...docs, ...docs].map((review, i) => (
          <span className={styles.tickerItem} key={i}>
            <Sparkles aria-hidden="true" className={styles.tickerIcon} /> {review.title}:{' '}
            <span className={styles.tickerOffer}>{review.bonusText}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export const BettingHero: React.FC<Page['hero']> = ({
  badge,
  byline,
  bylineRole,
  headingHighlight,
  headingLine1,
  headingLine2,
  links,
  richText,
  updatedText,
}) => {
  // Backwards compatible: an H1 inside the rich text is still used when the explicit lines are empty.
  const rootChildren = (richText as any)?.root?.children || []
  const headingNode = rootChildren.find((n: any) => n.type === 'heading' && n.tag === 'h1')
  const legacyHeading: string = headingNode?.children?.map((c: any) => c.text || '').join('') || ''

  let line1 = headingLine1 || ''
  let line2 = headingLine2 || ''
  let highlight = headingHighlight || ''
  if (!line1 && legacyHeading) {
    const lead = highlight && legacyHeading.endsWith(highlight) ? legacyHeading.slice(0, -highlight.length) : legacyHeading
    line1 = lead.trim()
    line2 = ''
  }

  const intro = paragraphsOf(richText)
  const author = byline?.replace(/^Written by\s+/i, '') || ''
  const initials = author
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <section className={cn('bg-hero', styles.hero)}>
      <div className={styles.heroGrid}>
        <div className={styles.content}>
          {badge && (
            <span className={styles.badge}>
              <ShieldCheck aria-hidden="true" className={styles.badgeIcon} />
              {badge}
            </span>
          )}

          {(line1 || line2 || highlight) && (
            <h1 className={styles.heading}>
              {line1 && <span className={styles.headingLine}>{line1}</span>}
              {(line2 || highlight) && (
                <span className={styles.headingLine}>
                  {line2}
                  {line2 && highlight && ' '}
                  {highlight && <span className="text-gradient">{highlight}</span>}
                </span>
              )}
            </h1>
          )}

          {intro.map((text, i) => (
            <p className={styles.intro} key={i}>
              {text}
            </p>
          ))}

          {Array.isArray(links) && links.length > 0 && (
            <div className={styles.ctaRow}>
              {links.map(({ id, link }, i) => {
                const Icon = link?.icon ? ICONS[link.icon as keyof typeof ICONS] : null
                const outline = link?.appearance === 'outline'
                return (
                  <SiteLink
                    className={cn(styles.ctaButton, outline ? styles.ctaOutline : styles.ctaSolid)}
                    key={id ?? i}
                    link={link}
                  >
                    {Icon && (
                      <Icon aria-hidden="true" className={cn(styles.ctaIcon, outline && styles.ctaIconOutline)} />
                    )}
                    {link?.label}
                  </SiteLink>
                )
              })}
            </div>
          )}

          {byline && (
            <div className={styles.bylineRow}>
              <div className={styles.avatar}>{initials}</div>
              <div>
                <p className={styles.bylineName}>
                  {byline}
                  {bylineRole && <span className={styles.bylineRole}> · {bylineRole}</span>}
                </p>
                {updatedText && <p className={styles.updatedText}>{updatedText}</p>}
              </div>
            </div>
          )}
        </div>

        <ReviewsBlockComponent
          blockType="reviewsBlock"
          heading="Top 5 Verified Bookmakers"
          limit={5}
          source="featured"
          variant="compact-list"
          viewAllLink={{ type: 'custom', url: '/#top', label: 'View all' }}
        />
      </div>
      <OfferTicker />
    </section>
  )
}
