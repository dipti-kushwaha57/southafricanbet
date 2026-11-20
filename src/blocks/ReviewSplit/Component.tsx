import React from 'react'

import type { ReviewSplitBlock as Props } from '@/payload-types'

import { ReviewIcon } from '@/components/review/ReviewIcon'
import { ReviewSection } from '@/components/review/ReviewSection'
import { splitRatioToColumns } from '@/fields/splitRatio'

export const ReviewSplitComponent: React.FC<Props> = (block) => {
  const { body, cards, columnRatio, highlight, lead } = block

  return (
    <ReviewSection {...block}>
      <div className="review-split" style={{ '--split-cols': splitRatioToColumns(columnRatio) } as React.CSSProperties}>
        <div className="review-split-main">
          {(lead || body) && (
            <p className="review-split-text">
              {lead && <b>{lead}</b>} {body}
            </p>
          )}
          {highlight?.value && (
            <div className="review-highlight-card">
              <ReviewIcon className="review-highlight-card-icon" name={highlight.icon} />
              <div>
                {highlight.label && <p className="review-highlight-card-label">{highlight.label}</p>}
                <p className="review-highlight-card-value">{highlight.value}</p>
                {highlight.caption && <p className="review-highlight-card-caption">{highlight.caption}</p>}
              </div>
            </div>
          )}
        </div>
        {cards && cards.length > 0 && (
          <ul className="review-split-cards">
            {cards.map((card, i) => (
              <li className="review-split-card" key={card.id ?? i}>
                <ReviewIcon className="review-split-card-icon" name={card.icon} />
                <p className="review-split-card-title">{card.title}</p>
                {card.text && <p className="review-split-card-text">{card.text}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ReviewSection>
  )
}
