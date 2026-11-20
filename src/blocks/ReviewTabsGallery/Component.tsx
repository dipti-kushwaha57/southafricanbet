import React from 'react'

import type { ReviewTabsGalleryBlock as Props } from '@/payload-types'

import { ReviewSection } from '@/components/review/ReviewSection'
import { TabsGallery } from './TabsGallery.client'

export const ReviewTabsGalleryComponent: React.FC<Props> = (block) => (
  <ReviewSection {...block}>
    <TabsGallery tabs={block.tabs || []} />
  </ReviewSection>
)
