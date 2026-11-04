import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FaqBlockComponent } from '@/blocks/Faq/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LicensingBlockComponent } from '@/blocks/LicensingBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PostsBlockComponent } from '@/blocks/PostsBlock/Component'
import { ReviewsBlockComponent } from '@/blocks/ReviewsBlock/Component'

// Homepage "section" blocks own their spacing; the older generic blocks still rely on a wrapper margin.
const SECTION_BLOCKS = new Set(['faqBlock', 'featureGrid', 'licensingBlock', 'postsBlock', 'reviewsBlock'])

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FaqBlockComponent,
  featureGrid: FeatureGridBlock,
  formBlock: FormBlock,
  licensingBlock: LicensingBlockComponent,
  mediaBlock: MediaBlock,
  postsBlock: PostsBlockComponent,
  reviewsBlock: ReviewsBlockComponent,
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

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={SECTION_BLOCKS.has(blockType) ? undefined : 'my-16'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
