'use client'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

import type { ReviewPaymentsBlock } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { cn } from '@/utilities/ui'

type Tab = NonNullable<ReviewPaymentsBlock['tabs']>[number]

export const PaymentsTable: React.FC<{ initialVisible: number; note?: string | null; tabs: Tab[] }> = ({
  initialVisible,
  note,
  tabs,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const tab = tabs[activeIndex]
  if (!tab) return null

  const rows = tab.rows || []
  const visibleRows = expanded ? rows : rows.slice(0, initialVisible)
  const hiddenCount = rows.length - visibleRows.length

  return (
    <>
      <div className="review-payments-bar">
        <div className="review-tabs" role="tablist">
          {tabs.map((item, i) => (
            <button
              aria-selected={i === activeIndex}
              className={cn('review-tab', i === activeIndex && 'is-active')}
              key={item.id ?? i}
              onClick={() => {
                setActiveIndex(i)
                setExpanded(false)
              }}
              role="tab"
              type="button"
            >
              {item.label} <span className="review-tab-count">({item.rows?.length || 0})</span>
            </button>
          ))}
        </div>
        {note && <p className="review-payments-note">{note}</p>}
      </div>

      <div className="review-table-wrap">
        <table className="review-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Type</th>
              <th>Minimum</th>
              <th>{tab.timeHeading || 'Time'}</th>
              <th className="is-right">Fee</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, i) => (
              <tr key={row.id ?? i}>
                <td>
                  <span className="review-table-method">
                    <CmsImg className="review-table-icon" resource={row.icon} />
                    {row.name}
                  </span>
                </td>
                <td className="is-muted">{row.type}</td>
                <td className="is-strong">{row.minimum}</td>
                <td>{row.time}</td>
                <td className="is-right">{row.fee && <span className="review-fee-pill">{row.fee}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="review-payment-cards">
        {visibleRows.map((row, i) => (
          <li className="review-payment-card" key={row.id ?? i}>
            <div className="review-payment-card-top">
              <CmsImg className="review-payment-card-icon" resource={row.icon} />
              <div className="review-payment-card-name">
                <p>{row.name}</p>
                {row.type && <p className="review-payment-card-type">{row.type}</p>}
              </div>
              {row.fee && <span className="review-fee-pill">{row.fee}</span>}
            </div>
            <dl className="review-payment-card-meta">
              <div>
                <dt>Minimum</dt>
                <dd>{row.minimum}</dd>
              </div>
              <div>
                <dt>{tab.timeHeading || 'Time'}</dt>
                <dd>{row.time}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {(hiddenCount > 0 || expanded) && rows.length > initialVisible && (
        <button className="review-outline-button review-show-all" onClick={() => setExpanded((v) => !v)} type="button">
          <Plus aria-hidden="true" className="review-show-all-icon" />
          {expanded ? 'Show fewer methods' : `Show all ${rows.length} methods`}
        </button>
      )}
    </>
  )
}
