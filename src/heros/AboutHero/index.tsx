import { ArrowRight, Users } from 'lucide-react'
import React from 'react'

import type { Page } from '@/payload-types'

import { ReviewIcon } from '@/components/review/ReviewIcon'
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

export const AboutHero: React.FC<Page['hero']> = ({
  badge,
  headingHighlight,
  headingLine1,
  headingLine2,
  links,
  miniStats,
  missionCaption,
  missionEyebrow,
  missionIcon,
  missionQuote,
  richText,
}) => {
  const intro = paragraphsOf(richText)

  return (
    <section className={cn('bg-hero', 'hero')}>
      <div className="hero-grid">
        <div className="hero-content">
          {badge && (
            <span className="hero-badge">
              <Users aria-hidden="true" className="hero-badge-icon" />
              {badge}
            </span>
          )}

          {(headingLine1 || headingLine2 || headingHighlight) && (
            <h1 className="hero-heading">
              {headingLine1 && <span className="hero-heading-line">{headingLine1}</span>}
              {(headingLine2 || headingHighlight) && (
                <span className="hero-heading-line">
                  {headingLine2}
                  {headingLine2 && headingHighlight && ' '}
                  {headingHighlight && <span className="text-gradient">{headingHighlight}</span>}
                </span>
              )}
            </h1>
          )}

          {intro.map((text, i) => (
            <p className="hero-intro" key={i}>
              {text}
            </p>
          ))}

          {Array.isArray(links) && links.length > 0 && (
            <div className="hero-cta-row">
              {links.map(({ id, link }, i) => {
                const outline = link?.appearance === 'outline'
                return (
                  <SiteLink
                    className={cn('hero-cta-button', outline ? 'hero-cta-outline' : 'hero-cta-solid')}
                    key={id ?? i}
                    link={link}
                  >
                    {link?.label}
                    {!outline && <ArrowRight aria-hidden="true" className="hero-cta-icon" />}
                  </SiteLink>
                )
              })}
            </div>
          )}
        </div>

        {missionQuote && (
          <div className="mission-card">
            <span className="mission-card-icon">
              <ReviewIcon className="mission-card-icon-svg" name={missionIcon} />
            </span>
            {missionEyebrow && <p className="mission-card-eyebrow">{missionEyebrow}</p>}
            <blockquote className="mission-card-quote">&ldquo;{missionQuote}&rdquo;</blockquote>
            {missionCaption && <p className="mission-card-caption">{missionCaption}</p>}
          </div>
        )}
      </div>

      {Array.isArray(miniStats) && miniStats.length > 0 && (
        <div className="hero-glance-wrap">
          <div className="glance-grid">
            {miniStats.map(({ icon, id, subtitle, title }, i) => (
              <div className="glance-tile" key={id ?? i}>
                <span className="glance-tile-icon">
                  <ReviewIcon className="glance-tile-icon-svg" name={icon} />
                </span>
                <div className="glance-tile-text">
                  <p className="glance-tile-title">{title}</p>
                  {subtitle && <p className="glance-tile-subtitle">{subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
