import type { Page, Post, Review } from '@/payload-types'

export type LinkFields = {
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'reviews'
    value: Page | Post | Review | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

/** Resolves a Payload `link` group to an href (undefined when it has no target). */
export const getLinkHref = (link?: LinkFields | null): string | undefined => {
  if (!link) return undefined

  if (link.type === 'reference' && typeof link.reference?.value === 'object') {
    const { relationTo, value } = link.reference
    if (!value.slug) return undefined
    return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${value.slug}`
  }

  return link.url || undefined
}
