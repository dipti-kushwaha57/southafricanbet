import React from 'react'

import type { Review, ReviewBonusBlock as Props } from '@/payload-types'

import { PlayNowButton } from '@/components/review/PlayNowButton'
import { ReviewSection } from '@/components/review/ReviewSection'
import { cn } from '@/utilities/ui'
import { BonusCalculator } from './BonusCalculator.client'

export const ReviewBonusComponent: React.FC<Props & { review: Review }> = ({ review, ...block }) => {
  const { calculator, ctaLabel, description, rows, tag, title } = block
  const headline = title || review.bonusText
  const showCalculator = Boolean(calculator?.enabled)

  return (
    <ReviewSection {...block}>
      <div className={cn('review-bonus-layout', showCalculator && 'has-calculator')}>
        <div className="review-bonus-card">
          <div className="bg-hero review-bonus-head">
            {tag && <p className="review-bonus-tag">{tag}</p>}
            <p className="review-bonus-title">{headline}</p>
            {description && <p className="review-bonus-desc">{description}</p>}
          </div>
          {rows && rows.length > 0 && (
            <dl className="review-bonus-rows">
              {rows.map((row, i) => (
                <div className="review-bonus-row" key={row.id ?? i}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="review-bonus-foot">
            <PlayNowButton href={review.playNowUrl}>{ctaLabel || `Claim ${review.bonusText}`}</PlayNowButton>
          </div>
        </div>
        {showCalculator && calculator && (
          <BonusCalculator
            casinoRollover={calculator.casinoRollover ?? 40}
            currency={calculator.currency || 'R'}
            defaultDeposit={calculator.defaultDeposit ?? 1000}
            matchPercent={calculator.matchPercent ?? 100}
            maxBonus={calculator.maxBonus ?? 5000}
            maxDeposit={calculator.maxDeposit ?? 6000}
            minDeposit={calculator.minDeposit ?? 20}
            sportsRollover={calculator.sportsRollover ?? 8}
            step={calculator.step ?? 10}
            tip={calculator.tip}
          />
        )}
      </div>
    </ReviewSection>
  )
}
