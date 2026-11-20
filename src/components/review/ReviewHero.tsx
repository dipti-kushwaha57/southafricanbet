import { CalendarDays, Check, ChevronRight, Gift, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import { PlayNowButton } from '@/components/review/PlayNowButton'
import { ReviewStars } from '@/components/review/ReviewStars'

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

export const ReviewHero: React.FC<{ review: Review }> = ({ review }) => {
  const hero = review.pageHero
  const features = (review.features || []).filter((feature) => feature.text)
  const stats = (hero?.stats || []).filter((stat) => stat.label && stat.value)
  const rankText = hero?.rankText || (review.rank ? `Ranked #${review.rank} sports betting site in SA` : '')
  const updated = formatDate(review.updatedAt)

  return (
    <section className="bg-hero review-hero">
      <div className="review-hero-inner">
        <nav aria-label="Breadcrumb" className="review-breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight aria-hidden="true" className="review-breadcrumb-icon" />
          <Link href="/#reviews">Bookmaker Reviews</Link>
          <ChevronRight aria-hidden="true" className="review-breadcrumb-icon" />
          <span className="review-breadcrumb-current">{review.title}</span>
        </nav>

        <div className="review-hero-grid">
          <div className="review-hero-main">
            <div className="review-hero-brand">
              <BookmakerLogo className="review-hero-logo" review={review} />
              <div>
                {hero?.licenceBadge && (
                  <span className="review-licence-badge">
                    <ShieldCheck aria-hidden="true" className="review-licence-badge-icon" />
                    {hero.licenceBadge}
                  </span>
                )}
                <h1 className="review-hero-title">
                  {review.title} Review{' '}
                  {hero?.titleSuffix && <span className="text-gradient">{hero.titleSuffix}</span>}
                </h1>
              </div>
            </div>

            <div className="review-hero-meta">
              <div className="review-hero-rating">
                <ReviewStars rating={review.rating} />
                <span className="review-hero-rating-text">{review.rating.toFixed(1)}/5</span>
              </div>
              <span aria-hidden="true" className="review-hero-divider" />
              {hero?.author && (
                <span className="review-hero-meta-text">
                  By <b>{hero.author}</b>
                </span>
              )}
              {updated && (
                <span className="review-hero-meta-text review-hero-updated">
                  <CalendarDays aria-hidden="true" className="review-hero-meta-icon" />
                  Updated {updated}
                </span>
              )}
            </div>

            {hero?.summary && <p className="review-hero-summary">{hero.summary}</p>}

            {features.length > 0 && (
              <ul className="review-hero-chips">
                {features.map((feature, i) => (
                  <li className="review-chip" key={feature.id ?? i}>
                    <Check aria-hidden="true" className="review-chip-icon" />
                    {feature.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="review-offer">
            {hero?.offerLabel && <div className="review-offer-label">{hero.offerLabel}</div>}
            <div className="review-offer-body">
              <div className="review-offer-score">
                <div
                  className="review-score-ring"
                  style={{
                    background: `conic-gradient(hsl(var(--primary)) ${(Math.min(review.rating, 5) / 5) * 100}%, hsl(var(--muted)) 0)`,
                  }}
                >
                  <div className="review-score-ring-inner">
                    <div>
                      <p className="review-score-ring-number">{review.rating.toFixed(1)}</p>
                      <p className="review-score-ring-caption">out of 5</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="review-offer-score-label">Our score</p>
                  {hero?.scoreLabel && <p className="review-offer-score-word">{hero.scoreLabel}</p>}
                  {rankText && <p className="review-offer-rank">{rankText}</p>}
                </div>
              </div>

              <div className="review-offer-bonus">
                <p className="review-offer-bonus-label">
                  <Gift aria-hidden="true" className="review-offer-bonus-icon" />
                  Welcome bonus
                </p>
                <p className="review-offer-bonus-text">{review.bonusText}</p>
                {hero?.bonusSubtext && <p className="review-offer-bonus-sub">{hero.bonusSubtext}</p>}
              </div>

              <PlayNowButton className="review-offer-cta" href={review.playNowUrl} size="block">
                {hero?.ctaLabel || 'Claim bonus'}
              </PlayNowButton>
              <p className="review-offer-fineprint">
                <b>18+</b>
                {hero?.bonusFinePrint ? ` · ${hero.bonusFinePrint}` : ''}
              </p>
            </div>
          </aside>
        </div>

        {stats.length > 0 && (
          <dl className="review-hero-stats">
            {stats.map((stat, i) => (
              <div className="review-hero-stat" key={stat.id ?? i}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
