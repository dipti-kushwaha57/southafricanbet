import React from 'react'

import type { ReviewStepsBlock as Props } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { ReviewSection } from '@/components/review/ReviewSection'
import { splitRatioToColumns } from '@/fields/splitRatio'

export const ReviewStepsComponent: React.FC<Props> = (block) => {
  const { caption, columnRatio, image, steps } = block
  const hasImage = Boolean(image && typeof image === 'object')

  return (
    <ReviewSection {...block}>
      <div
        className={hasImage ? 'review-steps has-image' : 'review-steps'}
        style={hasImage ? ({ '--split-cols': splitRatioToColumns(columnRatio) } as React.CSSProperties) : undefined}
      >
        <ol className="review-steps-list">
          {(steps || []).map((step, i) => (
            <li className="review-step" key={step.id ?? i}>
              <span className="review-step-number">{i + 1}</span>
              <div>
                <p className="review-step-title">{step.title}</p>
                {step.text && <p className="review-step-text">{step.text}</p>}
              </div>
            </li>
          ))}
        </ol>
        {hasImage && (
          <figure className="review-figure">
            <CmsImg className="review-figure-image" resource={image} />
            {caption && <figcaption className="review-figure-caption">{caption}</figcaption>}
          </figure>
        )}
      </div>
    </ReviewSection>
  )
}
