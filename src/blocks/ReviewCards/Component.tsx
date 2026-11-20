import React from 'react'

import type { ReviewCardsBlock as Props } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { ReviewIcon } from '@/components/review/ReviewIcon'
import { ReviewSection } from '@/components/review/ReviewSection'
import { splitRatioToColumns } from '@/fields/splitRatio'
import { cn } from '@/utilities/ui'

export const ReviewCardsComponent: React.FC<Props> = (block) => {
  const { callout, columnRatio, columns, items, sideCaption, sideImage, variant } = block
  const hasSideImage = Boolean(sideImage && typeof sideImage === 'object')

  const cards = (
    <ul
      className={cn(
        'review-cards',
        variant === 'row' && 'is-row',
        variant === 'plain' && 'is-plain',
        variant === 'contact' && 'is-contact',
        hasSideImage && 'is-stacked',
      )}
      data-columns={columns || '3'}
    >
      {(items || []).map((item, i) => (
        <li className="review-card" key={item.id ?? i}>
          {item.icon && (
            <span className="review-card-icon">
              <ReviewIcon className="review-card-icon-svg" name={item.icon} />
            </span>
          )}
          <div className="review-card-body">
            {item.tag && <span className="review-card-tag">{item.tag}</span>}
            <p className="review-card-title">{item.title}</p>
            {item.text && <p className="review-card-text">{item.text}</p>}
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <ReviewSection {...block}>
      {hasSideImage ? (
        <div className="review-cards-split" style={{ '--split-cols': splitRatioToColumns(columnRatio) } as React.CSSProperties}>
          {cards}
          <figure className="review-figure">
            <CmsImg className="review-figure-image" resource={sideImage} />
            {sideCaption && <figcaption className="review-figure-caption">{sideCaption}</figcaption>}
          </figure>
        </div>
      ) : (
        cards
      )}
      {(callout?.title || callout?.text) && (
        <div className={cn('review-callout', `is-${callout.tone || 'warning'}`)}>
          <ReviewIcon className="review-callout-icon" name={callout.icon} />
          <div className="review-callout-body">
            {callout.title && <b>{callout.title}</b>}
            {callout.text && <p>{callout.text}</p>}
          </div>
        </div>
      )}
    </ReviewSection>
  )
}
