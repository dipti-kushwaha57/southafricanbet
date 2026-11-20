import React from 'react'

import type { Review, ReviewFactGridBlock as Props } from '@/payload-types'

import { PaymentsSlider } from '@/components/PaymentsSlider'
import { ReviewSection } from '@/components/review/ReviewSection'

export const ReviewFactGridComponent: React.FC<Props & { review: Review }> = ({ review, ...block }) => {
  const { columns, facts, paymentsLabel, showPaymentMethods } = block
  const payments = (review.paymentMethods || []).filter((method) => method.icon && typeof method.icon === 'object')

  return (
    <ReviewSection {...block}>
      <dl className="review-facts" data-columns={columns || '2'}>
        {(facts || []).map((fact, i) => (
          <div className="review-fact" key={fact.id ?? i}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      {showPaymentMethods && payments.length > 0 && (
        <div className="review-fact review-fact-payments">
          <p className="review-fact-label">{paymentsLabel || 'Payment methods'}</p>
          <PaymentsSlider
            groupClassName="review-fact-payments-group"
            iconClassName="review-payment-icon"
            payments={payments}
            trackClassName="review-fact-payments-track"
            wrapClassName="review-fact-payments-list"
          />
        </div>
      )}
    </ReviewSection>
  )
}
