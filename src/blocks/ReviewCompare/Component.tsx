import { ArrowRight, Check, Trophy } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Review, ReviewCompareBlock as Props } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import { PlayNowButton } from '@/components/review/PlayNowButton'
import { ReviewSection } from '@/components/review/ReviewSection'
import { ReviewStars } from '@/components/review/ReviewStars'
import { cn } from '@/utilities/ui'

type Winner = 'ours' | 'theirs' | 'tie'

const Cell: React.FC<{ better: boolean; tie: boolean; value?: string | null }> = ({ better, tie, value }) => (
  <div className={cn('review-compare-cell', better && 'is-better', tie && 'is-tie')}>
    <span>{value}</span>
    {better && (
      <span className="review-compare-better">
        <Check aria-hidden="true" className="review-compare-better-icon" />
        Better
      </span>
    )}
  </div>
)

export const ReviewCompareComponent: React.FC<Props & { review: Review }> = ({ review, ...block }) => {
  const { badge, opponent, opponentShortName, rows, summary } = block
  if (!opponent || typeof opponent !== 'object') return null

  const theirShort = opponentShortName || opponent.title
  const compared = (rows || []).map((row) => {
    let ourValue = row.ourValue
    let theirValue = row.theirValue
    let winner: Winner = (row.winner as Winner) || 'tie'

    if (row.kind === 'bonus') {
      ourValue = review.bonusText
      theirValue = opponent.bonusText
    } else if (row.kind === 'rating') {
      ourValue = `${review.rating.toFixed(1)}/5`
      theirValue = `${opponent.rating.toFixed(1)}/5`
      winner = review.rating > opponent.rating ? 'ours' : review.rating < opponent.rating ? 'theirs' : 'tie'
    }

    return { id: row.id, label: row.label, ourValue, theirValue, winner }
  })

  const ourWins = compared.filter((row) => row.winner === 'ours').length
  const theirWins = compared.filter((row) => row.winner === 'theirs').length
  const ties = compared.length - ourWins - theirWins
  const headline =
    ourWins === theirWins
      ? `${review.title} and ${opponent.title} are level`
      : `${ourWins > theirWins ? review.title : opponent.title} wins ${Math.max(ourWins, theirWins)} of ${compared.length}`

  return (
    <ReviewSection {...block}>
      <div className="bg-hero review-compare">
        <div className="review-compare-heads">
          <div className="review-compare-card is-ours">
            {badge && <span className="review-compare-badge">{badge}</span>}
            <BookmakerLogo className="review-compare-logo" review={review} />
            <p className="review-compare-name">{review.title}</p>
            <div className="review-compare-rating">
              <span className="review-compare-rating-number">{review.rating.toFixed(1)}</span>
              <ReviewStars className="review-compare-stars" rating={review.rating} />
            </div>
            <p className="review-compare-bonus">{review.bonusText}</p>
            <PlayNowButton className="review-compare-cta" href={review.playNowUrl} size="compact">
              Play Now
            </PlayNowButton>
          </div>

          <span className="review-compare-vs">VS</span>

          <div className="review-compare-card">
            <BookmakerLogo className="review-compare-logo" review={opponent} />
            <p className="review-compare-name">{opponent.title}</p>
            <div className="review-compare-rating">
              <span className="review-compare-rating-number">{opponent.rating.toFixed(1)}</span>
              <ReviewStars className="review-compare-stars" rating={opponent.rating} />
            </div>
            <p className="review-compare-bonus">{opponent.bonusText}</p>
            <Link className="review-compare-review-link" href={`/reviews/${opponent.slug}`}>
              Read review
              <ArrowRight aria-hidden="true" className="review-compare-review-link-icon" />
            </Link>
          </div>
        </div>

        <div className="review-compare-rows">
          {compared.map((row, i) => (
            <div className="review-compare-row" key={row.id ?? i}>
              <p className="review-compare-row-label is-mobile">{row.label}</p>
              <div className="review-compare-row-grid">
                <Cell better={row.winner === 'ours'} tie={row.winner === 'tie'} value={row.ourValue} />
                <p className="review-compare-row-label is-desktop">{row.label}</p>
                <Cell better={row.winner === 'theirs'} tie={row.winner === 'tie'} value={row.theirValue} />
              </div>
            </div>
          ))}
        </div>

        <div className="review-compare-summary">
          <div className="review-compare-summary-text">
            <span className="review-compare-summary-icon">
              <Trophy aria-hidden="true" className="review-compare-summary-icon-svg" />
            </span>
            <div>
              <p className="review-compare-summary-title">{headline}</p>
              {summary && <p className="review-compare-summary-sub">{summary}</p>}
            </div>
          </div>
          <div className="review-compare-tally">
            <span className="is-ours">
              {review.title} <b>{ourWins}</b>
            </span>
            <span>
              Tie <b>{ties}</b>
            </span>
            <span>
              {theirShort} <b>{theirWins}</b>
            </span>
          </div>
        </div>
      </div>
    </ReviewSection>
  )
}
