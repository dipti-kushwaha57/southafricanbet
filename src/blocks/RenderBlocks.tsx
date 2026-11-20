import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FaqBlockComponent } from '@/blocks/Faq/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { FlexibleColumnsComponent } from '@/blocks/FlexibleColumns/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LegalSectionsComponent } from '@/blocks/LegalSections/Component'
import { LicensingBlockComponent } from '@/blocks/LicensingBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PostsBlockComponent } from '@/blocks/PostsBlock/Component'
import { ReviewCardsComponent } from '@/blocks/ReviewCards/Component'
import { ReviewFaqComponent } from '@/blocks/ReviewFaq/Component'
import { ReviewPaymentsComponent } from '@/blocks/ReviewPayments/Component'
import { ReviewProsConsComponent } from '@/blocks/ReviewProsCons/Component'
import { ReviewShowcaseComponent } from '@/blocks/ReviewShowcase/Component'
import { ReviewSplitComponent } from '@/blocks/ReviewSplit/Component'
import { ReviewSpotlightComponent } from '@/blocks/ReviewSpotlight/Component'
import { ReviewStepsComponent } from '@/blocks/ReviewSteps/Component'
import { ReviewTabsGalleryComponent } from '@/blocks/ReviewTabsGallery/Component'
import { ReviewsBlockComponent } from '@/blocks/ReviewsBlock/Component'
import { TeamSpotlightComponent } from '@/blocks/TeamSpotlight/Component'

// Homepage "section" blocks own their spacing; the older generic blocks still rely on a wrapper margin.
const SECTION_BLOCKS = new Set([
  'content',
  'faqBlock',
  'featureGrid',
  'flexCols',
  'formBlock',
  'legalSections',
  'licensingBlock',
  'postsBlock',
  'reviewsBlock',
  'reviewCards',
  'reviewFaq',
  'reviewPayments',
  'reviewProsCons',
  'reviewShowcase',
  'reviewSplit',
  'reviewSpotlight',
  'reviewSteps',
  'reviewTabsGallery',
  'teamSpotlight',
])

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FaqBlockComponent,
  featureGrid: FeatureGridBlock,
  flexCols: FlexibleColumnsComponent,
  formBlock: FormBlock,
  legalSections: LegalSectionsComponent,
  licensingBlock: LicensingBlockComponent,
  mediaBlock: MediaBlock,
  postsBlock: PostsBlockComponent,
  reviewsBlock: ReviewsBlockComponent,
  // Shared review sections that don't need a `review` document to render - safe on any page.
  reviewCards: ReviewCardsComponent,
  reviewFaq: ReviewFaqComponent,
  reviewPayments: ReviewPaymentsComponent,
  reviewProsCons: ReviewProsConsComponent,
  reviewShowcase: ReviewShowcaseComponent,
  reviewSplit: ReviewSplitComponent,
  reviewSpotlight: ReviewSpotlightComponent,
  reviewSteps: ReviewStepsComponent,
  reviewTabsGallery: ReviewTabsGalleryComponent,
  teamSpotlight: TeamSpotlightComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          const Block = blockType
            ? (blockComponents as Record<string, React.ComponentType<any> | undefined>)[blockType]
            : undefined

          if (Block) {
            return (
              <div className={SECTION_BLOCKS.has(blockType as string) ? undefined : 'my-16'} key={index}>
                <Block {...block} disableInnerContainer />
              </div>
            )
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
