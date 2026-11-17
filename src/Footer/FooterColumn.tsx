'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

import type { Footer } from '@/payload-types'

import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'

type FooterColumnData = NonNullable<Footer['columns']>[number]

/** One footer link group. Collapses into an accordion on mobile/tablet; always open from the desktop breakpoint up. */
export const FooterColumn: React.FC<{ column: FooterColumnData; defaultOpen?: boolean }> = ({
  column,
  defaultOpen,
}) => {
  const [open, setOpen] = useState(!!defaultOpen)
  const navItems = column.navItems || []

  return (
    <nav aria-label={column.title} className="site-footer-column">
      <button
        aria-expanded={open}
        className="site-footer-column-toggle"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="site-footer-column-title">{column.title}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn('site-footer-column-chevron', open && 'site-footer-column-chevron-open')}
        />
      </button>
      <span className="site-footer-column-rule" />
      <div className={cn('site-footer-column-panel', open && 'site-footer-column-panel-open')}>
        <ul className="site-footer-column-list">
          {navItems.map(({ id, link }, j) => (
            <li key={id ?? j}>
              <SiteLink className="site-footer-column-link" link={link} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
