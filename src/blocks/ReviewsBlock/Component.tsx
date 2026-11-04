import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Review, ReviewsBlock as ReviewsBlockProps } from '@/payload-types'

import { Section } from '@/components/Section'
import { CardGrid } from './CardGrid'
import { CompactList } from './CompactList'
import { DetailedList } from './DetailedList'

async function getReviews(props: ReviewsBlockProps): Promise<Review[]> {
  const { source, limit: limitFromProps, selectedReviews } = props

  const payload = await getPayload({ config: configPromise })

  if (source === 'selected') {
    if (!selectedReviews?.length) return []

    const ids = selectedReviews.map((review) => (typeof review === 'object' ? review.id : review))
    const result = await payload.find({
      collection: 'reviews',
      depth: 1,
      limit: ids.length,
      pagination: false,
      where: { id: { in: ids } },
    })

    return ids.map((id) => result.docs.find((doc) => doc.id === id)).filter((doc): doc is Review => Boolean(doc))
  }

  const result = await payload.find({
    collection: 'reviews',
    depth: 1,
    limit: limitFromProps || 5,
    sort: 'rank',
    where: {
      featured: {
        equals: true,
      },
    },
  })

  return result.docs
}

export const ReviewsBlockComponent: React.FC<ReviewsBlockProps & { id?: string }> = async (props) => {
  const { anchorId, eyebrow, heading, headingHighlight, initialVisible, intro, tinted, variant, viewAllLink } = props

  const reviews = await getReviews(props)

  if (!reviews.length) return null

  if (variant === 'compact-list') {
    return <CompactList heading={heading} reviews={reviews} viewAllLink={viewAllLink} />
  }

  return (
    <Section
      anchorId={anchorId}
      eyebrow={eyebrow}
      heading={heading}
      headingHighlight={headingHighlight}
      intro={intro}
      tinted={tinted}
    >
      {variant === 'detailed-list' ? (
        <DetailedList reviews={reviews} />
      ) : (
        <CardGrid initialVisible={initialVisible} reviews={reviews} />
      )}
    </Section>
  )
}
