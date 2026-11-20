import { Check, X } from 'lucide-react'
import React from 'react'

import type { ReviewProsConsBlock as Props } from '@/payload-types'

import { ReviewSection } from '@/components/review/ReviewSection'

export const ReviewProsConsComponent: React.FC<Props> = (block) => {
  const { cons, consTitle, pros, prosTitle } = block

  return (
    <ReviewSection {...block}>
      <div className="review-proscons">
        <div className="review-pros">
          <h3 className="review-proscons-title">
            <span className="review-proscons-badge">
              <Check aria-hidden="true" className="review-proscons-badge-icon" />
            </span>
            {prosTitle || 'Pros'}
          </h3>
          <ul className="review-proscons-list">
            {(pros || []).map((item, i) => (
              <li key={item.id ?? i}>
                <Check aria-hidden="true" className="review-proscons-item-icon" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="review-cons">
          <h3 className="review-proscons-title">
            <span className="review-proscons-badge">
              <X aria-hidden="true" className="review-proscons-badge-icon" />
            </span>
            {consTitle || 'Cons'}
          </h3>
          <ul className="review-proscons-list">
            {(cons || []).map((item, i) => (
              <li key={item.id ?? i}>
                <X aria-hidden="true" className="review-proscons-item-icon" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ReviewSection>
  )
}
