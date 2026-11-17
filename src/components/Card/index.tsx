'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import { ArrowRight, Newspaper } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { getCollectionUrlPrefix } from '@/utilities/collectionPath'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatDate = (iso: string) => {
  const date = new Date(iso)
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `${getCollectionUrlPrefix(relationTo || '')}/${slug}`

  return (
    <article className={cn('archive-card', className)} ref={card.ref}>
      <div className="archive-card-image-wrap">
        {metaImage && typeof metaImage === 'object' ? (
          <CmsImg alt={titleToUse || ''} className="archive-card-image" resource={metaImage} />
        ) : (
          <div className="archive-card-image-placeholder">
            <Newspaper aria-hidden="true" className="archive-card-image-placeholder-icon" />
          </div>
        )}
      </div>
      <div className="archive-card-body">
        <div className="archive-card-meta">
          {showCategories && hasCategories && (
            <span className="archive-card-category">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Untitled category'
                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </span>
          )}
          {publishedAt && <span className="archive-card-date">{formatDate(publishedAt)}</span>}
        </div>
        {titleToUse && (
          <h3 className="archive-card-title">
            <Link className="archive-card-title-link" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && <p className="archive-card-description">{sanitizedDescription}</p>}
        <span className="archive-card-read-more">
          Read article <ArrowRight aria-hidden="true" className="archive-card-read-more-icon" />
        </span>
      </div>
    </article>
  )
}
