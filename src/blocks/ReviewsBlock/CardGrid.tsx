'use client'
import { BadgeCheck, ChevronDown, Copy, Star } from 'lucide-react'
// import Link from 'next/link' // demo: re-enable once /reviews/[slug] exists
import React, { useState } from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import buttons from '@/components/buttons.module.css'
import { cn } from '@/utilities/ui'
// import { reviewHref } from '@/utilities/reviewHref' // demo: re-enable once /reviews/[slug] exists
import styles from './CardGrid.module.css'

const PromoCode: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      className={styles.promoButton}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        } catch {
          window.prompt('Copy this promo code:', code)
        }
      }}
      type="button"
    >
      {copied ? 'Copied!' : `Code: ${code}`} <Copy aria-hidden="true" className={styles.promoCopyIcon} />
    </button>
  )
}

/** Ranked "#1 Pick" cards. Shows the first `initialVisible` and a toggle for the rest. */
export const CardGrid: React.FC<{ initialVisible?: number | null; reviews: Review[] }> = ({
  initialVisible,
  reviews,
}) => {
  const [showAll, setShowAll] = useState(false)

  const limit = initialVisible && initialVisible > 0 ? initialVisible : reviews.length
  const collapsible = reviews.length > limit

  return (
    <div>
      <div className={styles.cardsGrid} id="bookmaker-grid">
        {reviews.map((review, index) => {
          const hidden = !showAll && index >= limit

          return (
            <article className={styles.card} hidden={hidden} key={review.id}>
              {index < 3 && <span className={styles.pickBadge}>#{index + 1} Pick</span>}
              <div className={styles.header}>
                <BookmakerLogo className={styles.logo} review={review} />
                <div>
                  <h3 className={styles.title}>
                    {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
                    <Link className="hover:text-primary" href={reviewHref(review.slug)}>
                      {review.title}
                    </Link>
                    */}
                    {review.title}
                  </h3>
                  <span className={styles.ratingRow}>
                    <Star aria-hidden="true" className={styles.starIcon} />
                    {review.rating.toFixed(1)}
                    <span className={styles.ratingOutOf}>/5</span>
                  </span>
                </div>
              </div>

              {review.bonusText && (
                <div className={styles.bonusBox}>
                  <p className={styles.bonusLabel}>Welcome offer</p>
                  <p className={styles.bonusText}>{review.bonusText}</p>
                  {review.promotionalCode && (
                    <div className={styles.promoWrap}>
                      <PromoCode code={review.promotionalCode} />
                    </div>
                  )}
                </div>
              )}

              {review.features && review.features.length > 0 && (
                <ul className={styles.featuresList}>
                  {review.features.map((feature, i) => (
                    <li className={styles.featureItem} key={feature.id ?? i}>
                      <BadgeCheck aria-hidden="true" className={styles.featureIcon} />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              )}

              <dl className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <dt className={styles.statLabel}>Min Deposit</dt>
                  <dd className={styles.statValue}>{review.minDeposit || '—'}</dd>
                </div>
                <div className={styles.statBox}>
                  <dt className={styles.statLabel}>Payout</dt>
                  <dd className={styles.statValue}>{review.payoutTime || '—'}</dd>
                </div>
                <div className={cn(styles.statBox, styles.statBoxWide)}>
                  <dt className={styles.statLabel}>Games</dt>
                  <dd className={styles.statValue}>{review.gamesOffered || '—'}</dd>
                </div>
              </dl>

              <div className={styles.ctaRow}>
                {/* Demo: review page isn't built yet — links disabled for now, restore when it exists.
                <Link className={cn(buttons.primary, buttons.flex1)} href={reviewHref(review.slug)}>
                  Play Now
                </Link>
                <Link className={buttons.outlineSmall} href={reviewHref(review.slug)}>
                  Review
                </Link>
                */}
                <span className={cn(buttons.primary, buttons.flex1)}>Play Now</span>
                <span className={buttons.outlineSmall}>Review</span>
              </div>
              <p className={styles.disclaimer}>18+ Only | Play Responsibly</p>
            </article>
          )
        })}
      </div>

      {collapsible && (
        <div className={styles.showAllWrap}>
          <button
            aria-expanded={showAll}
            className={styles.showAllButton}
            onClick={() => setShowAll((open) => !open)}
            type="button"
          >
            {showAll ? 'Show fewer' : `Show all ${reviews.length} bookmakers`}{' '}
            <ChevronDown aria-hidden="true" className={styles.showAllIcon} />
          </button>
        </div>
      )}
    </div>
  )
}
