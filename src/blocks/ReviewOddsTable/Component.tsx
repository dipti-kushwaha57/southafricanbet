import React from 'react'

import type { Review, ReviewOddsTableBlock as Props } from '@/payload-types'

import { ReviewSection } from '@/components/review/ReviewSection'

export const ReviewOddsTableComponent: React.FC<Props & { review: Review }> = ({ review, ...block }) => {
  const { awayLabel, drawLabel, fixtures, homeLabel, opponent, tableNote, tableTitle } = block
  const opponentName = opponent && typeof opponent === 'object' ? opponent.title : 'Opponent'

  return (
    <ReviewSection {...block}>
      {tableTitle && <h3 className="review-subheading">{tableTitle}</h3>}
      {tableNote && <p className="review-subnote">{tableNote}</p>}

      {/* Mobile: a card per fixture, no horizontal scroll. */}
      <div className="review-odds-cards">
        {(fixtures || []).map((fixture, i) => (
          <div className="review-odds-card" key={fixture.id ?? i}>
            <p className="review-odds-card-fixture">{fixture.name}</p>
            {fixture.note && <p className="review-odds-card-note">{fixture.note}</p>}
            <div className="review-odds-card-legend">
              <span />
              <span className="is-center">{homeLabel || 'Home'}</span>
              <span className="is-center">{drawLabel || 'Draw'}</span>
              <span className="is-center">{awayLabel || 'Away'}</span>
            </div>
            <div className="review-odds-card-row is-ours">
              <span className="review-odds-name">{review.title}</span>
              {([fixture.ours?.home, fixture.ours?.draw, fixture.ours?.away] as const).map((price, j) => (
                <span className="is-center" key={j}>
                  <span className="review-odds-price">{price}</span>
                </span>
              ))}
            </div>
            <div className="review-odds-card-row is-theirs">
              <span className="review-odds-name">{opponentName}</span>
              {([fixture.theirs?.home, fixture.theirs?.draw, fixture.theirs?.away] as const).map((price, j) => (
                <span className="is-center" key={j}>
                  {price}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet/desktop: the full comparison table. */}
      <div className="review-odds-wrap">
        <table className="review-odds">
          <thead>
            <tr>
              <th>Fixture</th>
              <th>Bookmaker</th>
              <th className="is-center">{homeLabel || 'Home'}</th>
              <th className="is-center">{drawLabel || 'Draw'}</th>
              <th className="is-center">{awayLabel || 'Away'}</th>
            </tr>
          </thead>
          <tbody>
            {(fixtures || []).map((fixture, i) => (
              <React.Fragment key={fixture.id ?? i}>
                <tr className="review-odds-ours">
                  <td className="review-odds-fixture" rowSpan={2}>
                    {fixture.name}
                    {fixture.note && <p>{fixture.note}</p>}
                  </td>
                  <td className="review-odds-name">{review.title}</td>
                  {([fixture.ours?.home, fixture.ours?.draw, fixture.ours?.away] as const).map((price, j) => (
                    <td className="is-center" key={j}>
                      <span className="review-odds-price">{price}</span>
                    </td>
                  ))}
                </tr>
                <tr className="review-odds-theirs">
                  <td className="review-odds-name">{opponentName}</td>
                  {([fixture.theirs?.home, fixture.theirs?.draw, fixture.theirs?.away] as const).map((price, j) => (
                    <td className="is-center" key={j}>
                      {price}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </ReviewSection>
  )
}
