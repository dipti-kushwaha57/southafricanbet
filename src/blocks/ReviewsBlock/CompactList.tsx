import { Star } from 'lucide-react'
// import Link from 'next/link' // demo: re-enable once /reviews/[slug] exists
import React from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import { BTN_PRIMARY } from '@/components/buttonClasses'
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
  <div className="min-w-0 rounded-3xl border bg-card p-5 shadow-card md:p-6">
    <div className="mb-4 flex items-center justify-between">
      {heading && <h2 className="text-lg font-extrabold">{heading}</h2>}
      <SiteLink className="shrink-0 whitespace-nowrap text-xs font-bold text-primary hover:underline" link={viewAllLink} />
    </div>
    <ol className="space-y-2.5">
      {reviews.map((review, index) => (
        <li
          className="group flex items-center gap-3 rounded-2xl border bg-background p-2.5 transition hover:border-primary"
          key={review.id}
        >
          <span className="w-6 text-center font-display text-lg font-extrabold text-primary">{index + 1}</span>
          <BookmakerLogo className="compact-logo h-11 w-11 rounded-xl bg-muted object-contain p-1" review={review} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2">
              {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
              <Link className="compact-name font-bold hover:text-primary" href={reviewHref(review.slug)}>
                {review.title}
              </Link>
              */}
              <span className="compact-name font-bold">{review.title}</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold">
                <Star aria-hidden="true" className="h-4 w-4 fill-gold text-gold" />
                {review.rating.toFixed(1)}
                <span className="font-medium text-muted-foreground">/5</span>
              </span>
            </div>
            {review.bonusText && <p className="truncate text-xs text-muted-foreground">{review.bonusText}</p>}
          </div>
          {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
          <Link className={cn(BTN_PRIMARY, '!px-3.5 !py-2 text-xs')} href={reviewHref(review.slug)}>
            Play
          </Link>
          */}
          <span className={cn(BTN_PRIMARY, '!px-3.5 !py-2 text-xs')}>Play</span>
        </li>
      ))}
    </ol>
  </div>
)
