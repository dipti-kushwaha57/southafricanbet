import React from 'react'

import type { ReviewPaymentsBlock as Props } from '@/payload-types'

import { ReviewSection } from '@/components/review/ReviewSection'
import { PaymentsTable } from './PaymentsTable'

export const ReviewPaymentsComponent: React.FC<Props> = (block) => {
  const { initialVisible, note, tabs } = block

  return (
    <ReviewSection {...block}>
      <PaymentsTable initialVisible={initialVisible || 8} note={note} tabs={tabs || []} />
    </ReviewSection>
  )
}
