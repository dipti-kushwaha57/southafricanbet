import React from 'react'

import { ReviewIcon } from '@/components/review/ReviewIcon'
import { SectionHeading } from '@/components/Section'
import { cn } from '@/utilities/ui'

export type ReviewSectionProps = {
  anchorId?: string | null
  eyebrow?: string | null
  eyebrowIcon?: string | null
  heading?: string | null
  headingHighlight?: string | null
  intro?: string | null
  tinted?: boolean | null
}

/** Shared shell for every review-page section: label with icon, heading, intro, then the body. */
export const ReviewSection: React.FC<ReviewSectionProps & { children?: React.ReactNode }> = ({
  anchorId,
  children,
  eyebrow,
  eyebrowIcon,
  heading,
  headingHighlight,
  intro,
  tinted,
}) => (
  <section className={cn('review-section', tinted && 'review-section-tinted bg-howto')} id={anchorId || undefined}>
    {(eyebrow || heading) && (
      <header className="review-section-head">
        {eyebrow && (
          <p className="review-eyebrow">
            {eyebrowIcon && (
              <span className="review-eyebrow-icon">
                <ReviewIcon className="review-eyebrow-icon-svg" name={eyebrowIcon} />
              </span>
            )}
            {eyebrow}
          </p>
        )}
        <SectionHeading className="review-heading" heading={heading} highlight={headingHighlight} />
      </header>
    )}
    {intro && <p className="review-intro">{intro}</p>}
    {children}
  </section>
)
