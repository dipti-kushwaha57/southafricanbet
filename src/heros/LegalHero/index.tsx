import { Calendar, FileText, Scale } from 'lucide-react'
import React from 'react'

import type { Page } from '@/payload-types'

import { ReviewIcon } from '@/components/review/ReviewIcon'
import { cn } from '@/utilities/ui'

/** Plain text of every paragraph in a Lexical state (the hero intro is a single <p>). */
const paragraphsOf = (richText: Page['hero']['richText']): string[] => {
  const children = (richText as any)?.root?.children || []
  return children
    .filter((node: any) => node.type === 'paragraph')
    .map((node: any) => (node.children || []).map((c: any) => c.text || '').join(''))
    .filter(Boolean)
}

export const LegalHero: React.FC<Page['hero']> = ({ badge, headingLine1, miniStats, readInfo, richText, updatedLabel }) => {
  const intro = paragraphsOf(richText)

  return (
    <section className={cn('bg-hero', 'hero')}>
      <div className="legal-hero-content">
        {badge && (
          <span className="hero-badge">
            <Scale aria-hidden="true" className="hero-badge-icon" />
            {badge}
          </span>
        )}

        {headingLine1 && <h1 className="hero-heading">{headingLine1}</h1>}

        {(updatedLabel || readInfo) && (
          <div className="legal-hero-meta">
            {updatedLabel && (
              <span className="legal-hero-meta-pill">
                <Calendar aria-hidden="true" className="legal-hero-meta-pill-icon" />
                {updatedLabel}
              </span>
            )}
            {readInfo && (
              <span className="legal-hero-meta-pill">
                <FileText aria-hidden="true" className="legal-hero-meta-pill-icon" />
                {readInfo}
              </span>
            )}
          </div>
        )}

        {intro.map((text, i) => (
          <p className="legal-hero-intro" key={i}>
            {text}
          </p>
        ))}

        {Array.isArray(miniStats) && miniStats.length > 0 && (
          <div className="glance">
            <p className="glance-label">At a glance</p>
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
      </div>
    </section>
  )
}
