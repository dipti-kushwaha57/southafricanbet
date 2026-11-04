/* eslint-disable @next/next/no-img-element */
import React from 'react'

import type { Review } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'

const PALETTE = [
  '#7c3aed',
  '#0f172a',
  '#111827',
  '#6d28d9',
  '#0e7490',
  '#ea580c',
  '#16a34a',
  '#ca8a04',
  '#dc2626',
  '#059669',
  '#b91c1c',
  '#d97706',
  '#4338ca',
  '#0369a1',
]

const colorFor = (name: string) =>
  PALETTE[name.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % PALETTE.length]

/** Initials tile used when a bookmaker has no uploaded logo (same SVG as the design). */
export const initialsLogoSrc = (name: string, color?: string | null) => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>` +
    `<rect width='64' height='64' rx='14' fill='${color || colorFor(name)}'/>` +
    `<text x='32' y='41' font-size='24' font-family='Arial' font-weight='700' fill='white' text-anchor='middle'>${name
      .slice(0, 2)
      .toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const BookmakerLogo: React.FC<{ className?: string; review: Pick<Review, 'brandColor' | 'icon' | 'title'> }> = ({
  className,
  review,
}) => {
  if (review.icon && typeof review.icon === 'object') {
    return <CmsImg alt={review.title} className={className} resource={review.icon} />
  }

  return (
    <img alt={review.title} className={className} loading="lazy" src={initialsLogoSrc(review.title, review.brandColor)} />
  )
}
