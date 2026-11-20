import { ArrowRight, Clock, Mail, MapPin, TriangleAlert, Users } from 'lucide-react'
import React from 'react'

import type { Page } from '@/payload-types'

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

const STAT_ICONS = [Clock, Users, MapPin]

export const ContactHero: React.FC<Page['hero']> = ({
  badge,
  headingHighlight,
  headingLine1,
  headingLine2,
  helpNote,
  links,
  responseNote,
  responseStatus,
  responseTime,
  richText,
  stats,
}) => {
  const intro = paragraphsOf(richText)

  return (
    <section className={cn('bg-hero', 'hero')}>
      <div className="hero-grid">
        <div className="hero-content">
          {badge && (
            <span className="hero-badge">
              <Mail aria-hidden="true" className="hero-badge-icon" />
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

        {(responseTime || helpNote) && (
          <div className="contact-hero-card">
            <div className="contact-hero-card-head">
              <p className="contact-hero-card-label">Response time</p>
              {responseStatus && (
                <span className="contact-hero-card-status">
                  <span className="contact-hero-card-status-dot" />
                  {responseStatus}
                </span>
              )}
            </div>
            {responseTime && <p className="contact-hero-card-value">{responseTime}</p>}
            {responseNote && <p className="contact-hero-card-note">{responseNote}</p>}
            {Array.isArray(stats) && stats.length > 0 && (
              <div className="contact-hero-card-stats">
                {stats.map(({ id, label, value }, i) => {
                  const Icon = STAT_ICONS[i % STAT_ICONS.length]
                  return (
                    <div className="contact-hero-card-stat" key={id ?? i}>
                      <Icon aria-hidden="true" className="contact-hero-card-stat-icon" />
                      <div className="contact-hero-card-stat-text">
                        <p className="contact-hero-card-stat-label">{label}</p>
                        <p className="contact-hero-card-stat-value">{value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {helpNote && (
              <div className="contact-hero-card-alert">
                <TriangleAlert aria-hidden="true" className="contact-hero-card-alert-icon" />
                <p>{helpNote}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
