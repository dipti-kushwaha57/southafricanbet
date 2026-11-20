import { BadgeCheck, Check } from 'lucide-react'
import React from 'react'

import type { Review, ReviewScoreboardBlock as Props } from '@/payload-types'

import { ReviewIcon } from '@/components/review/ReviewIcon'
import { ReviewSection } from '@/components/review/ReviewSection'
import { ReviewStars } from '@/components/review/ReviewStars'
import { cn } from '@/utilities/ui'

const SEGMENTS = [0, 1, 2, 3, 4]

export const ReviewScoreboardComponent: React.FC<Props & { review: Review }> = ({ review, ...block }) => {
  const { categories, highlights, highlightsHeading, stats, summary, testedLabel } = block

  return (
    <ReviewSection {...block}>
      <div className="review-score-grid">
        <div className="review-score-card bg-howto">
          <span aria-hidden="true" className="review-score-blob review-score-blob-red" />
          <span aria-hidden="true" className="review-score-blob review-score-blob-gold" />
          <div className="review-score-card-main">
            <p className="review-score-card-label">Overall score</p>
            <div className="review-score-card-value">
              <span className="review-score-card-number">{review.rating.toFixed(1)}</span>
              <span className="review-score-card-max">/5</span>
            </div>
            <div className="review-score-card-stars">
              <ReviewStars rating={review.rating} />
              {review.pageHero?.scoreLabel && (
                <span className="review-score-pill">{review.pageHero.scoreLabel}</span>
              )}
            </div>
            {summary && <p className="review-score-card-text">{summary}</p>}
          </div>
          {stats && stats.length > 0 && (
            <dl className="review-score-card-stats">
              {stats.map((stat, i) => (
                <div key={stat.id ?? i}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {testedLabel && (
            <p className="review-score-card-tested">
              <BadgeCheck aria-hidden="true" className="review-score-card-tested-icon" />
              {testedLabel}
            </p>
          )}
        </div>

        <ul className="review-score-list">
          {(categories || []).map((category, i) => (
            <li className={cn('review-score-item', category.score >= 5 && 'is-top')} key={category.id ?? i}>
              <div className="review-score-item-top">
                <span className="review-score-item-icon">
                  <ReviewIcon className="review-score-item-icon-svg" name={category.icon} />
                </span>
                <div className="review-score-item-text">
                  <p className="review-score-item-title">{category.title}</p>
                  {category.description && <p className="review-score-item-desc">{category.description}</p>}
                </div>
                <span className="review-score-item-score">{category.score.toFixed(1)}</span>
              </div>
              <div aria-hidden="true" className="review-score-bars">
                {SEGMENTS.map((segment) => (
                  <span className="review-score-bar" key={segment}>
                    <span
                      className="review-score-bar-fill"
                      style={{ width: `${Math.max(0, Math.min(1, category.score - segment)) * 100}%` }}
                    />
                  </span>
                ))}
              </div>
            </li>
          ))}
          {highlights && highlights.length > 0 && (
            <li className="review-score-highlights">
              <p className="review-score-highlights-title">{highlightsHeading || 'Highlights'}</p>
              <div className="review-score-highlights-list">
                {highlights.map((highlight, i) => (
                  <span className="review-score-highlight" key={highlight.id ?? i}>
                    <Check aria-hidden="true" className="review-score-highlight-icon" />
                    {highlight.text}
                  </span>
                ))}
              </div>
            </li>
          )}
        </ul>
      </div>
    </ReviewSection>
  )
}
