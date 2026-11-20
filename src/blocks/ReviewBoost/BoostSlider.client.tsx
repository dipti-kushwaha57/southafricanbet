'use client'
import React, { useId, useState } from 'react'

import { cn } from '@/utilities/ui'

type Tier = { boost: number; from: number }

export const BoostSlider: React.FC<{
  defaultValue: number
  description?: string | null
  footnote?: string | null
  max: number
  min: number
  tag?: string | null
  tiers: Tier[]
  title: string
  unitLabel: string
}> = ({ defaultValue, description, footnote, max, min, tag, tiers, title, unitLabel }) => {
  const id = useId()
  const sorted = [...tiers].sort((a, b) => a.from - b.from)
  const [value, setValue] = useState(Math.min(Math.max(defaultValue, min), max))

  const topBoost = Math.max(...sorted.map((tier) => tier.boost), 1)
  const current = [...sorted].reverse().find((tier) => tier.from <= value)
  const barHeight = (boost: number) => 8 + 92 * Math.sqrt(boost / topBoost)

  return (
    <div className="review-boost">
      <div className="review-boost-top">
        <div className="review-boost-text">
          {tag && <p className="review-boost-tag">{tag}</p>}
          <h3 className="review-boost-title">{title}</h3>
          {description && <p className="review-boost-desc">{description}</p>}
        </div>
        <div className="review-boost-badge">
          <p className="review-boost-badge-label">
            {value} {unitLabel}
          </p>
          <p className="review-boost-badge-value">{current ? `+${current.boost}%` : '—'}</p>
        </div>
      </div>
      <label className="sr-only" htmlFor={id}>
        Number of {unitLabel}
      </label>
      <input
        className="review-range review-boost-range"
        id={id}
        max={max}
        min={min}
        onChange={(event) => setValue(Number(event.target.value))}
        type="range"
        value={value}
      />
      <div aria-hidden="true" className="review-boost-bars">
        {sorted.map((tier) => (
          <button
            className="review-boost-bar"
            key={tier.from}
            onClick={() => setValue(tier.from)}
            tabIndex={-1}
            type="button"
          >
            <span
              className={cn('review-boost-bar-fill', tier.from <= value && 'is-active')}
              style={{ height: `${barHeight(tier.boost)}%` }}
            />
            <span className="review-boost-bar-label">{tier.from}</span>
          </button>
        ))}
      </div>
      {footnote && <p className="review-boost-footnote">{footnote}</p>}
    </div>
  )
}
