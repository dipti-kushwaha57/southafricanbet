import React from 'react'

import type { Review } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FaqBlockComponent } from '@/blocks/Faq/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { FlexibleColumnsComponent } from '@/blocks/FlexibleColumns/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LicensingBlockComponent } from '@/blocks/LicensingBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PostsBlockComponent } from '@/blocks/PostsBlock/Component'
import { ReviewBonusComponent } from '@/blocks/ReviewBonus/Component'
import { ReviewBoostComponent } from '@/blocks/ReviewBoost/Component'
import { ReviewCardsComponent } from '@/blocks/ReviewCards/Component'
import { ReviewCompareComponent } from '@/blocks/ReviewCompare/Component'
import { ReviewFactGridComponent } from '@/blocks/ReviewFactGrid/Component'
import { ReviewFaqComponent } from '@/blocks/ReviewFaq/Component'
import { ReviewOddsTableComponent } from '@/blocks/ReviewOddsTable/Component'
import { ReviewPaymentsComponent } from '@/blocks/ReviewPayments/Component'
import { ReviewProsConsComponent } from '@/blocks/ReviewProsCons/Component'
import { ReviewScoreboardComponent } from '@/blocks/ReviewScoreboard/Component'
import { ReviewShowcaseComponent } from '@/blocks/ReviewShowcase/Component'
import { ReviewSplitComponent } from '@/blocks/ReviewSplit/Component'
import { ReviewSpotlightComponent } from '@/blocks/ReviewSpotlight/Component'
import { ReviewStepsComponent } from '@/blocks/ReviewSteps/Component'
import { ReviewTabsGalleryComponent } from '@/blocks/ReviewTabsGallery/Component'
import { ReviewVerdictComponent } from '@/blocks/ReviewVerdict/Component'
import { ReviewsBlockComponent } from '@/blocks/ReviewsBlock/Component'

export type ReviewLayoutBlock = NonNullable<Review['layout']>[number]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Only review-page sections carry the shared `anchorId`/`tocLabel`/`attachToPrevious` fields -
 *  homepage sections (shared via `allBlocks`) don't define them, so reads go through this type. */
type ReviewOnlyFields = { anchorId?: string | null; tocLabel?: string | null; attachToPrevious?: boolean | null }

/** Gives every block an anchor: the editor's Anchor ID, else one made from its menu label. */
export const getReviewBlockAnchor = (block: ReviewLayoutBlock, index: number) => {
  const { anchorId, tocLabel } = block as ReviewLayoutBlock & ReviewOnlyFields
  return anchorId || (tocLabel ? slugify(tocLabel) : `section-${index + 1}`)
}

/** Items for the sticky "On this page" bar: blocks that have a menu label. */
export const getReviewTocItems = (blocks: ReviewLayoutBlock[]) =>
  blocks.flatMap((block, index) => {
    const { tocLabel } = block as ReviewLayoutBlock & ReviewOnlyFields
    return tocLabel ? [{ id: getReviewBlockAnchor(block, index), label: tocLabel }] : []
  })

const renderBlock = (block: ReviewLayoutBlock, anchorId: string, review: Review) => {
  switch (block.blockType) {
    // Shared homepage sections - don't need `review` or `anchorId`.
    case 'archive':
      return <ArchiveBlock {...block} id={block.id ?? undefined} />
    case 'cta':
      return <CallToActionBlock {...block} />
    case 'content':
      return <ContentBlock {...block} />
    case 'faqBlock':
      return <FaqBlockComponent {...block} id={block.id ?? undefined} />
    case 'featureGrid':
      return <FeatureGridBlock {...block} id={block.id ?? undefined} />
    case 'flexCols':
      return <FlexibleColumnsComponent {...block} id={block.id ?? undefined} />
    case 'formBlock':
      return <FormBlock {...(block as any)} id={block.id ?? undefined} />
    case 'licensingBlock':
      return <LicensingBlockComponent {...block} id={block.id ?? undefined} />
    case 'mediaBlock':
      return <MediaBlock {...block} id={block.id ?? undefined} />
    case 'postsBlock':
      return <PostsBlockComponent {...block} id={block.id ?? undefined} />
    case 'reviewsBlock':
      return <ReviewsBlockComponent {...block} id={block.id ?? undefined} />
    case 'reviewBonus':
      return <ReviewBonusComponent {...block} anchorId={anchorId} review={review} />
    case 'reviewBoost':
      return <ReviewBoostComponent {...block} anchorId={anchorId} />
    case 'reviewCards':
      return <ReviewCardsComponent {...block} anchorId={anchorId} />
    case 'reviewCompare':
      return <ReviewCompareComponent {...block} anchorId={anchorId} review={review} />
    case 'reviewOddsTable':
      return <ReviewOddsTableComponent {...block} anchorId={anchorId} review={review} />
    case 'reviewShowcase':
      return <ReviewShowcaseComponent {...block} anchorId={anchorId} />
    case 'reviewTabsGallery':
      return <ReviewTabsGalleryComponent {...block} anchorId={anchorId} />
    case 'reviewFactGrid':
      return <ReviewFactGridComponent {...block} anchorId={anchorId} review={review} />
    case 'reviewFaq':
      return <ReviewFaqComponent {...block} anchorId={anchorId} />
    case 'reviewPayments':
      return <ReviewPaymentsComponent {...block} anchorId={anchorId} />
    case 'reviewProsCons':
      return <ReviewProsConsComponent {...block} anchorId={anchorId} />
    case 'reviewScoreboard':
      return <ReviewScoreboardComponent {...block} anchorId={anchorId} review={review} />
    case 'reviewSplit':
      return <ReviewSplitComponent {...block} anchorId={anchorId} />
    case 'reviewSpotlight':
      return <ReviewSpotlightComponent {...block} anchorId={anchorId} />
    case 'reviewSteps':
      return <ReviewStepsComponent {...block} anchorId={anchorId} />
    case 'reviewVerdict':
      return <ReviewVerdictComponent {...block} anchorId={anchorId} review={review} />
    default:
      return null
  }
}

export const RenderReviewBlocks: React.FC<{ blocks?: ReviewLayoutBlock[] | null; review: Review }> = ({
  blocks,
  review,
}) => {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const { attachToPrevious } = block as ReviewLayoutBlock & ReviewOnlyFields
        return (
          <div className={attachToPrevious ? 'review-block is-attached' : 'review-block'} key={block.id ?? index}>
            {renderBlock(block, getReviewBlockAnchor(block, index), review)}
          </div>
        )
      })}
    </>
  )
}
