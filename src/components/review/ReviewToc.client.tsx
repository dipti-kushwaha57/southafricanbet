'use client'
import { ChevronLeft, ChevronRight, ListChecks } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

export type ReviewTocItem = { id: string; label: string }

/** Sticky "On this page" bar: numbered section chips that follow the scroll position. */
export const ReviewToc: React.FC<{ children?: React.ReactNode; items: ReviewTocItem[] }> = ({ children, items }) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(items[0]?.id)
  const [edges, setEdges] = useState({ end: false, start: true })

  useEffect(() => {
    const elements = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => Boolean(el))
    if (elements.length === 0) return

    const onScroll = () => {
      const line = window.innerHeight * 0.3
      let current = elements[0].id
      for (const el of elements) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  useEffect(() => {
    const chip = scrollerRef.current?.querySelector<HTMLElement>('[aria-current="true"]')
    const scroller = scrollerRef.current
    if (!chip || !scroller) return
    const left = chip.offsetLeft - scroller.offsetLeft
    if (left < scroller.scrollLeft || left + chip.offsetWidth > scroller.scrollLeft + scroller.clientWidth) {
      scroller.scrollTo({ behavior: 'smooth', left: left - 24 })
    }
  }, [active])

  const syncEdges = () => {
    const el = scrollerRef.current
    if (!el) return
    setEdges({ end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2, start: el.scrollLeft <= 2 })
  }

  useEffect(syncEdges, [items])

  const scrollBy = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (el) el.scrollBy({ behavior: 'smooth', left: direction * el.clientWidth * 0.7 })
  }

  return (
    <nav aria-label="On this page" className="review-toc">
      <div className="review-toc-inner">
        <p className="review-toc-title">
          <ListChecks aria-hidden="true" className="review-toc-title-icon" />
          On this page
        </p>
        <button
          aria-label="Scroll sections left"
          className="review-toc-arrow"
          disabled={edges.start}
          onClick={() => scrollBy(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" className="review-toc-arrow-icon" />
        </button>
        <div className="review-toc-scroller" onScroll={syncEdges} ref={scrollerRef}>
          {items.map((item, i) => {
            const isActive = item.id === active
            return (
              <a
                aria-current={isActive ? 'true' : undefined}
                className={cn('review-toc-chip', isActive && 'is-active')}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                <span className="review-toc-chip-number">{i + 1}</span>
                {item.label}
              </a>
            )
          })}
        </div>
        <button
          aria-label="Scroll sections right"
          className="review-toc-arrow"
          disabled={edges.end}
          onClick={() => scrollBy(1)}
          type="button"
        >
          <ChevronRight aria-hidden="true" className="review-toc-arrow-icon" />
        </button>
        {children && <div className="review-toc-trailing">{children}</div>}
      </div>
    </nav>
  )
}
