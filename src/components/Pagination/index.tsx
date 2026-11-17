'use client'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Pagination: React.FC<{
  basePath?: string
  className?: string
  page: number
  query?: Record<string, string>
  totalPages: number
}> = (props) => {
  const router = useRouter()

  const { basePath = '/news/page', className, page, query, totalPages } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const goTo = (target: number) => {
    if (query) {
      const params = new URLSearchParams(query)
      if (target > 1) params.set('page', String(target))
      const search = params.toString()
      router.push(`${basePath}${search ? `?${search}` : ''}`)
      return
    }
    router.push(`${basePath}/${target}`)
  }

  return (
    <nav aria-label="Pagination" className={cn('archive-pagination', className)}>
      <button
        className="archive-pagination-edge"
        disabled={!hasPrevPage}
        onClick={() => goTo(page - 1)}
        type="button"
      >
        <ChevronLeft aria-hidden="true" className="archive-pagination-icon" /> <span>Previous</span>
      </button>

      <div className="archive-pagination-pages">
        {hasExtraPrevPages && (
          <span className="archive-pagination-ellipsis" aria-hidden="true">
            <MoreHorizontal className="archive-pagination-icon" />
          </span>
        )}

        {hasPrevPage && (
          <button className="archive-pagination-page" onClick={() => goTo(page - 1)} type="button">
            {page - 1}
          </button>
        )}

        <button aria-current="page" className="archive-pagination-page archive-pagination-page-active" type="button">
          {page}
        </button>

        {hasNextPage && (
          <button className="archive-pagination-page" onClick={() => goTo(page + 1)} type="button">
            {page + 1}
          </button>
        )}

        {hasExtraNextPages && (
          <span className="archive-pagination-ellipsis" aria-hidden="true">
            <MoreHorizontal className="archive-pagination-icon" />
          </span>
        )}
      </div>

      <button
        className="archive-pagination-edge"
        disabled={!hasNextPage}
        onClick={() => goTo(page + 1)}
        type="button"
      >
        <span>Next</span> <ChevronRight aria-hidden="true" className="archive-pagination-icon" />
      </button>
    </nav>
  )
}
