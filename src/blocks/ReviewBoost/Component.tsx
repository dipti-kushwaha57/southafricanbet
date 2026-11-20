import React from 'react'

import type { ReviewBoostBlock as Props } from '@/payload-types'

import { ReviewSection } from '@/components/review/ReviewSection'
import { BoostSlider } from './BoostSlider.client'

export const ReviewBoostComponent: React.FC<Props> = (block) => {
  const { defaultValue, description, footnote, max, min, tag, tiers, title, unitLabel } = block

  return (
    <ReviewSection {...block}>
      <BoostSlider
        defaultValue={defaultValue ?? 10}
        description={description}
        footnote={footnote}
        max={max ?? 50}
        min={min ?? 2}
        tag={tag}
        tiers={(tiers || []).map(({ boost, from }) => ({ boost, from }))}
        title={title}
        unitLabel={unitLabel || 'legs'}
      />
    </ReviewSection>
  )
}
