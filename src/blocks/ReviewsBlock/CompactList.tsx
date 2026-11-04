import { Star } from 'lucide-react'
// import Link from 'next/link' // demo: re-enable once /reviews/[slug] exists
import React from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import buttons from '@/components/buttons.module.css'
import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'
// import { reviewHref } from '@/utilities/reviewHref' // demo: re-enable once /reviews/[slug] exists
import type { LinkFields } from '@/utilities/linkHref'
import styles from './CompactList.module.css'

/** "Top 5 Verified Bookmakers" widget: ranked rows with logo, rating, offer and a PLAY button. */
export const CompactList: React.FC<{
  heading?: string | null
  reviews: Review[]
  viewAllLink?: LinkFields | null
}> = ({ heading, reviews, viewAllLink }) => (
  <div className={styles.panel}>
    <div className={styles.panelHead}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <SiteLink className={styles.viewAll} link={viewAllLink} />
    </div>
    <ol className={styles.list}>
      {reviews.map((review, index) => (
        <li className={styles.row} key={review.id}>
          <span className={styles.rank}>{index + 1}</span>
          <BookmakerLogo className={styles.logo} review={review} />
          <div className={styles.info}>
            <div className={styles.infoTop}>
              {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
              <Link className={cn(styles.name, 'hover:text-primary')} href={reviewHref(review.slug)}>
                {review.title}
              </Link>
              */}
              <span className={styles.name}>{review.title}</span>
              <span className={styles.rating}>
                <Star aria-hidden="true" className={styles.starIcon} />
                {review.rating.toFixed(1)}
                <span className={styles.ratingOutOf}>/5</span>
              </span>
            </div>
            {review.bonusText && <p className={styles.bonus}>{review.bonusText}</p>}
          </div>
          {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
          <Link className={cn(buttons.primary, buttons.sizeCompact)} href={reviewHref(review.slug)}>
            Play
          </Link>
          */}
          <span className={cn(buttons.primary, buttons.sizeCompact)}>Play</span>
        </li>
      ))}
    </ol>
  </div>
)
