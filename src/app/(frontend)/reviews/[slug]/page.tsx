import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { RenderReviewBlocks, getReviewTocItems } from '@/blocks/review/RenderReviewBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { BookmakerLogo } from '@/components/BookmakerLogo'
import { PlayNowButton } from '@/components/review/PlayNowButton'
import { ReviewHero } from '@/components/review/ReviewHero'
import { ReviewToc } from '@/components/review/ReviewToc.client'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const reviews = await payload.find({
    collection: 'reviews',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return reviews.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ReviewPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/reviews/' + decodedSlug
  const review = await queryReviewBySlug({ slug: decodedSlug })

  if (!review) return <PayloadRedirects url={url} />

  const tocItems = getReviewTocItems(review.layout || [])

  return (
    <article>
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ReviewHero review={review} />

      {tocItems.length > 0 && (
        <ReviewToc items={tocItems}>
          <BookmakerLogo className="review-toc-logo" review={review} />
          <div className="review-toc-bonus">
            <p className="review-toc-bonus-label">{review.title} bonus</p>
            <p className="review-toc-bonus-text">{review.bonusText}</p>
          </div>
          <PlayNowButton href={review.playNowUrl} size="compact">
            Play Now
          </PlayNowButton>
        </ReviewToc>
      )}

      <div className="review-body">
        <RenderReviewBlocks blocks={review.layout} review={review} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const review = await queryReviewBySlug({ slug: decodedSlug })

  return generateMeta({ doc: review })
}

const queryReviewBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'reviews',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
