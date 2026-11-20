import { ArrowRight } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * The one Play Now / Claim Bonus button used across the review page. The URL always
 * comes from the review's single "Play Now link" field.
 */
export const PlayNowButton: React.FC<{
  children: React.ReactNode
  className?: string
  href?: string | null
  size?: 'block' | 'compact' | 'default'
}> = ({ children, className, href, size = 'default' }) => {
  const classes = cn(
    'review-cta',
    size === 'block' && 'review-cta-block',
    size === 'compact' && 'review-cta-compact',
    className,
  )
  const content = (
    <>
      {children}
      <ArrowRight aria-hidden="true" className="review-cta-icon" />
    </>
  )

  if (!href) return <span className={classes}>{content}</span>

  return (
    <a className={classes} href={href} rel="nofollow noopener sponsored" target="_blank">
      {content}
    </a>
  )
}
