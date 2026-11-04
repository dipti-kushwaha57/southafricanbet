import { ArrowRight, Star, Trophy } from 'lucide-react'
// import Link from 'next/link' // demo: re-enable once /reviews/[slug] exists
import React from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import buttons from '@/components/buttons.module.css'
import { CmsImg } from '@/components/CmsImg'
import { cn } from '@/utilities/ui'
// import { reviewHref } from '@/utilities/reviewHref' // demo: re-enable once /reviews/[slug] exists
import styles from './DetailedList.module.css'

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <span aria-label={`${rating} out of 5`} className={styles.starsWrap}>
    <span className={styles.starsBg}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star aria-hidden="true" className={styles.starIconEmpty} key={i} />
      ))}
    </span>
    <span className={styles.starsFg} style={{ width: `${(rating / 5) * 100}%` }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star aria-hidden="true" className={styles.starIconFull} key={i} />
      ))}
    </span>
  </span>
)

/** Large "hand-picked" rows: logo + rank, rating, best-for, offer, payments, CTAs and a stats strip. */
export const DetailedList: React.FC<{ reviews: Review[] }> = ({ reviews }) => (
  <div className={styles.list}>
    {reviews.map((review) => {
      const payments = (review.paymentMethods || []).filter(
        (method) => method.icon && typeof method.icon === 'object',
      )

      return (
        <article className={styles.card} key={review.id}>
          {review.badge && <span className={styles.badge}>{review.badge}</span>}
          <div className={styles.grid}>
            <div className={styles.profileCol}>
              <BookmakerLogo className={styles.logo} review={review} />
              <div>
                <h3 className={styles.title}>{review.title}</h3>
                <div className={styles.ratingRow}>
                  <span className={styles.ratingNumber}>{review.rating.toFixed(1)}</span>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>

            <div className={styles.middleCol}>
              {review.bestFor && (
                <p className={styles.bestFor}>
                  <Trophy aria-hidden="true" className={styles.bestForIcon} /> Best for: {review.bestFor}
                </p>
              )}
              {review.bonusText && <p className={styles.bonusText}>{review.bonusText}</p>}
              {payments.length > 0 && (
                <div aria-label="Accepted payment methods" className={styles.payments}>
                  {payments.map((method, i) => (
                    <CmsImg
                      alt={method.name}
                      className={styles.paymentIcon}
                      key={method.id ?? i}
                      resource={method.icon}
                      title={method.name}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className={styles.ctaCol}>
              {/* Demo: review page isn't built yet — links disabled for now, restore when it exists.
              <Link className={cn(buttons.primary, buttons.flex1, buttons.sizeResponsive)} href={reviewHref(review.slug)}>
                Play Now
              </Link>
              <Link className={styles.readReviewButton} href={reviewHref(review.slug)}>
                Read Review <ArrowRight aria-hidden="true" className={styles.readReviewIcon} />
              </Link>
              */}
              <span className={cn(buttons.primary, buttons.flex1, buttons.sizeResponsive)}>Play Now</span>
              <span className={styles.readReviewButton}>
                Read Review <ArrowRight aria-hidden="true" className={styles.readReviewIcon} />
              </span>
            </div>
          </div>

          <dl className={styles.statsGrid}>
            <div className={styles.statCell}>
              <dt className={styles.statLabel}>Win Rate: </dt>
              <dd className={styles.statValue}>{review.winRate || '—'}</dd>
            </div>
            <div className={styles.statCell}>
              <dt className={styles.statLabel}>Payout Speed: </dt>
              <dd className={styles.statValue}>{review.payoutTime || '—'}</dd>
            </div>
            <div className={styles.statCell}>
              <dt className={styles.statLabel}>Wagering: </dt>
              <dd className={styles.statValue}>{review.wagering || '—'}</dd>
            </div>
            <div className={cn(styles.statCell, styles.statCellCenter)}>
              <span>
                <span className={styles.statHighlight}>18+</span> | Play responsibly.
              </span>
            </div>
          </dl>
        </article>
      )
    })}
  </div>
)
