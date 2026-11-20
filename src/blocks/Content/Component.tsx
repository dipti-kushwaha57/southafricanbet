import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { SiteLink } from '@/components/Link/SiteLink'

const WIDTH_CLASS: Record<string, string> = {
  full: 'is-full',
  half: 'is-half',
  oneThird: 'is-third',
  twoThirds: 'is-two-thirds',
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <section className="section-wrap">
      <div className="section-container">
        <div className="content-row">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div className={`content-col ${WIDTH_CLASS[size || 'oneThird']}`} key={index}>
                  {richText && <RichText data={richText} enableGutter={false} />}
                  {enableLink && link && <SiteLink className="content-col-link" link={link} />}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
