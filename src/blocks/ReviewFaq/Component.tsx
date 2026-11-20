import React from 'react'

import type { ReviewFaqBlock as Props } from '@/payload-types'

import { ReviewSection } from '@/components/review/ReviewSection'
import { ReviewFaqAccordion } from './Accordion'

export const ReviewFaqComponent: React.FC<Props> = (block) => (
  <ReviewSection {...block}>
    <ReviewFaqAccordion items={(block.items || []).map(({ answer, question }) => ({ answer, question }))} />
  </ReviewSection>
)
