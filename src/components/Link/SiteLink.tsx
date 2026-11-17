import Link from 'next/link'
import React from 'react'

import { getLinkHref, type LinkFields } from '@/utilities/linkHref'

/** Unstyled CMS link: resolves the href and renders next/link with the given classes. */
export const SiteLink: React.FC<{
  'aria-hidden'?: boolean
  children?: React.ReactNode
  className?: string
  link?: LinkFields | null
  tabIndex?: number
}> = ({ children, className, link, tabIndex, ...rest }) => {
  const href = getLinkHref(link)
  if (!href) return null

  const external = /^https?:\/\//.test(href)
  const extra = link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  return (
    <Link
      className={className}
      href={href}
      tabIndex={tabIndex}
      {...(external && !link?.newTab ? { rel: 'noopener' } : {})}
      {...extra}
      {...rest}
    >
      {children ?? link?.label}
    </Link>
  )
}
