import React from 'react'

import type { Review, ReviewVerdictBlock as Props } from '@/payload-types'

import { PlayNowButton } from '@/components/review/PlayNowButton'
import { ReviewStars } from '@/components/review/ReviewStars'
import { SectionHeading } from '@/components/Section'

export const ReviewVerdictComponent: React.FC<Props & { review: Review }> = ({ review, ...block }) => {
  const { anchorId, body, ctaLabel, eyebrow, heading, headingHighlight, secondaryHref, secondaryLabel } = block

  return (
    <section className="review-section" id={anchorId || undefined}>
      <div className="review-verdict bg-howto">
        <span aria-hidden="true" className="review-score-blob review-score-blob-red" />
        <span aria-hidden="true" className="review-score-blob review-score-blob-gold" />
        <div className="review-verdict-grid">
          <div className="review-verdict-score">
            <div className="review-verdict-ring">
              <div>
                <p className="review-verdict-ring-number">{review.rating.toFixed(1)}</p>
                <p className="review-verdict-ring-caption">out of 5</p>
              </div>
            </div>
            <ReviewStars rating={review.rating} />
          </div>
          <div>
            {eyebrow && <p className="review-verdict-eyebrow">{eyebrow}</p>}
            <SectionHeading className="review-verdict-heading" heading={heading} highlight={headingHighlight} />
            {body && <p className="review-verdict-text">{body}</p>}
            <div className="review-verdict-actions">
              <PlayNowButton href={review.playNowUrl}>{ctaLabel || `Claim ${review.bonusText}`}</PlayNowButton>
              {secondaryLabel && (
                <a className="review-outline-button" href={secondaryHref || '#'}>
                  {secondaryLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
