/* eslint-disable @next/next/no-img-element */
import React from 'react'

import type { Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

/** Plain <img> for an uploaded Payload media doc (keeps markup identical to the design). */
export const CmsImg: React.FC<{
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
  resource?: Media | string | number | null
  title?: string
}> = ({ alt, className, loading = 'lazy', resource, title }) => {
  if (!resource || typeof resource !== 'object' || !resource.url) return null

  return (
    <img
      alt={alt ?? resource.alt ?? ''}
      className={className}
      loading={loading}
      src={getMediaUrl(resource.url, resource.updatedAt)}
      title={title}
    />
  )
}
