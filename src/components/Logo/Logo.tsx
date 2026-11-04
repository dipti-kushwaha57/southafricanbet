import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  logo?: MediaType | string | number | null
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = ({ className, logo, loading, priority }: Props) => {
  if (logo && typeof logo === 'object') {
    return (
      <span className={`${className || ''} sab-logo-img sab-logo-media-wrap`}>
        <Media resource={logo} loading={loading} priority={priority === 'high'} imgClassName="h-100" />
      </span>
    )
  }

  return (
    <span className={`${className || ''} sab-logo-text-wrap`}>
      <span className="sab-logo-text">
        SouthAfrican<span className="sab-logo-text-accent">Bet</span>
      </span>
      <span className="sab-logo-subtext">.co.za</span>
    </span>
  )
}
