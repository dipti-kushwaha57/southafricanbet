import React from 'react'

import type { ReviewSpotlightBlock as Props } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { ReviewSection } from '@/components/review/ReviewSection'

export const ReviewSpotlightComponent: React.FC<Props> = (block) => {
  const { image, note, stats, tag, text, title } = block
  const hasImage = Boolean(image && typeof image === 'object')

  return (
    <ReviewSection {...block}>
      <div className={hasImage ? 'review-spotlight has-image' : 'review-spotlight'}>
        <div className="review-spotlight-body">
          {tag && <p className="review-spotlight-tag">{tag}</p>}
          <h3 className="review-spotlight-title">{title}</h3>
          {text && <p className="review-spotlight-text">{text}</p>}
          {stats && stats.length > 0 && (
            <dl className="review-spotlight-stats">
              {stats.map((stat, i) => (
                <div key={stat.id ?? i}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {note && <p className="review-spotlight-note">{note}</p>}
        </div>
        {hasImage && <CmsImg className="review-spotlight-image" resource={image} />}
      </div>
    </ReviewSection>
  )
}
