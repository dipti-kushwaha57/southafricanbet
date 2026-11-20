'use client'
import React, { useState } from 'react'

import type { ReviewTabsGalleryBlock } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { ReviewIcon } from '@/components/review/ReviewIcon'
import { cn } from '@/utilities/ui'

type Tab = NonNullable<ReviewTabsGalleryBlock['tabs']>[number]

export const TabsGallery: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  if (!tab) return null

  return (
    <>
      <div className="review-tabs review-gallery-tabs" role="tablist">
        {tabs.map((item, i) => (
          <button
            aria-selected={i === active}
            className={cn('review-tab review-gallery-tab', i === active && 'is-light')}
            key={item.id ?? i}
            onClick={() => setActive(i)}
            role="tab"
            type="button"
          >
            <ReviewIcon className="review-gallery-tab-icon" name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>
      <figure className="review-figure review-gallery-figure">
        <CmsImg className="review-figure-image" resource={tab.image} />
        {tab.caption && <figcaption className="review-figure-caption">{tab.caption}</figcaption>}
      </figure>
    </>
  )
}
