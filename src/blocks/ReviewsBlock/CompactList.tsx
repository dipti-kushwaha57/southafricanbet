import { Star } from 'lucide-react'
// import Link from 'next/link' // demo: re-enable once /reviews/[slug] exists
import React from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'
// import { reviewHref } from '@/utilities/reviewHref' // demo: re-enable once /reviews/[slug] exists
import type { LinkFields } from '@/utilities/linkHref'

/** "Top 5 Verified Bookmakers" widget: ranked rows with logo, rating, offer and a PLAY button. */
export const CompactList: React.FC<{
  heading?: string | null
  reviews: Review[]
  viewAllLink?: LinkFields | null
}> = ({ heading, reviews, viewAllLink }) => (
  <div className="compact-list-panel">
    <div className="compact-list-panel-head">
      {heading && <h2 className="compact-list-heading">{heading}</h2>}
      <SiteLink className="compact-list-view-all" link={viewAllLink} />
    </div>
    <ol className="compact-list-list">
      {reviews.map((review, index) => (
        <li className="compact-list-row" key={review.id}>
          <span className="compact-list-rank">{index + 1}</span>
          <BookmakerLogo className="compact-list-logo" review={review} />
          <div className="compact-list-info">
            <div className="compact-list-info-top">
              {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
              <Link className={cn('compact-list-name', 'hover:text-primary')} href={reviewHref(review.slug)}>
                {review.title}
              </Link>
              */}
              <span className="compact-list-name">{review.title}</span>
              <span className="compact-list-rating">
                <Star aria-hidden="true" className="compact-list-star-icon" />
                {review.rating.toFixed(1)}
                <span className="compact-list-rating-out-of">/5</span>
              </span>
            </div>
            {review.bonusText && <p className="compact-list-bonus">{review.bonusText}</p>}
          </div>
          {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
          <Link className={cn('btn-primary', 'btn-size-compact')} href={reviewHref(review.slug)}>
            Play
          </Link>
          */}
          <span className={cn('btn-primary', 'btn-size-compact')}>Play</span>
        </li>
      ))}
    </ol>
  </div>
)
