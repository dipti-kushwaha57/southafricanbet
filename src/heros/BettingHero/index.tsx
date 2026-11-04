import configPromise from '@payload-config'
import { Gift, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'

import type { Page } from '@/payload-types'

import { ReviewsBlockComponent } from '@/blocks/ReviewsBlock/Component'
import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'

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
    <div className="overflow-hidden border-t bg-card py-3">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-sm font-semibold text-muted-foreground">
        {[...docs, ...docs].map((review, i) => (
          <span className="inline-flex items-center gap-2" key={i}>
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-primary" /> {review.title}:{' '}
            <span className="text-foreground">{review.bonusText}</span>
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
    <section className="bg-hero relative overflow-hidden border-b">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.15fr_1fr]">
        <div className="min-w-0">
          {badge && (
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-bold">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-success" />
              {badge}
            </span>
          )}

          {(line1 || line2 || highlight) && (
            <h1 className="mt-5 text-[clamp(1.5rem,7.4vw,2.25rem)] font-extrabold leading-[1.05] md:text-[clamp(1.75rem,4vw,3.5rem)]">
              {line1 && <span className="block whitespace-nowrap">{line1}</span>}
              {(line2 || highlight) && (
                <span className="block whitespace-nowrap">
                  {line2}
                  {line2 && highlight && ' '}
                  {highlight && <span className="text-gradient">{highlight}</span>}
                </span>
              )}
            </h1>
          )}

          {intro.map((text, i) => (
            <p className="mt-5 max-w-xl text-muted-foreground md:text-lg" key={i}>
              {text}
            </p>
          ))}

          {Array.isArray(links) && links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {links.map(({ id, link }, i) => {
                const Icon = link?.icon ? ICONS[link.icon as keyof typeof ICONS] : null
                const outline = link?.appearance === 'outline'
                return (
                  <SiteLink
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition sm:gap-2 sm:px-6 sm:py-3 sm:text-base',
                      outline
                        ? 'border bg-card hover:border-primary'
                        : 'bg-gradient-primary text-primary-foreground shadow-glow hover:-translate-y-0.5',
                    )}
                    key={id ?? i}
                    link={link}
                  >
                    {Icon && <Icon aria-hidden="true" className={cn('h-3.5 w-3.5 sm:h-4 sm:w-4', outline && 'text-primary')} />}
                    {link?.label}
                  </SiteLink>
                )
              })}
            </div>
          )}

          {byline && (
            <div className="mt-8 flex items-center gap-3 text-sm">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground">
                {initials}
              </div>
              <div>
                <p className="font-bold">
                  {byline}
                  {bylineRole && <span className="whitespace-nowrap font-medium text-muted-foreground"> · {bylineRole}</span>}
                </p>
                {updatedText && <p className="text-muted-foreground">{updatedText}</p>}
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

