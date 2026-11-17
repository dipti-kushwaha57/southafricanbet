import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { NavIcon } from '@/utilities/navIcons'
import { Media } from '@/components/Media'
import { getCollectionUrlPrefix } from '@/utilities/collectionPath'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Media as MediaType, Page, Post, Review } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  hasDropdown?: boolean | null
  icon?: string | null
  iconCircle?: boolean
  iconColor?: string
  iconImage?: MediaType | string | number | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'reviews'
    value: Page | Post | Review | string | number
  } | null
  size?: ButtonProps['size'] | null
  style?: React.CSSProperties
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    hasDropdown,
    icon,
    iconCircle,
    iconColor,
    iconImage,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    style,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${getCollectionUrlPrefix(reference.relationTo)}/${reference.value.slug}`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const rawIconEl = iconImage ? (
    <Media resource={iconImage} imgClassName="sab-nav-icon-img" />
  ) : icon ? (
    <NavIcon icon={icon} color={iconColor} />
  ) : null

  const iconEl = !rawIconEl ? null : iconCircle ? (
    <span className="sab-nav-icon-circle d-inline-flex align-items-center justify-content-center rounded-circle">
      {rawIconEl}
    </span>
  ) : (
    <span className="me-1 d-inline-flex align-items-center">{rawIconEl}</span>
  )

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} style={style} href={href || url || ''} {...newTabProps}>
        {iconEl}
        {label && label}
        {hasDropdown && <ChevronDown size={14} className="sab-chevron-inline ms-1" />}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance} style={style}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {iconEl}
        {label && label}
        {hasDropdown && <ChevronDown size={14} className="sab-chevron-inline ms-1" />}
        {children && children}
      </Link>
    </Button>
  )
}
