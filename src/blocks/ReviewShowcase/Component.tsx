import React from 'react'

import type { ReviewShowcaseBlock as Props } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { ReviewSection } from '@/components/review/ReviewSection'

export const ReviewShowcaseComponent: React.FC<Props> = (block) => {
  const { caption, chips, columns, image, lists } = block
  const hasImage = Boolean(image && typeof image === 'object')

  return (
    <ReviewSection {...block}>
      {chips && chips.length > 0 && (
        <div className="review-chips">
          {chips.map((chip, i) => (
            <span className="review-pill" key={chip.id ?? i}>
              {chip.text}
            </span>
          ))}
        </div>
      )}
      {hasImage && (
        <figure className="review-figure review-showcase-figure">
          <CmsImg className="review-figure-image" resource={image} />
          {caption && <figcaption className="review-figure-caption">{caption}</figcaption>}
        </figure>
      )}
      {lists && lists.length > 0 && (
        <div className="review-lists" data-columns={columns || '3'}>
          {lists.map((list, i) => (
            <div className="review-list-card" key={list.id ?? i}>
              <p className="review-list-title">{list.title}</p>
              <ul className="review-list">
                {(list.items || []).map((item, j) => (
                  <li key={item.id ?? j}>
                    <span aria-hidden="true" className="review-list-dot" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </ReviewSection>
  )
}
