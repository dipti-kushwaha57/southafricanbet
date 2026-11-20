'use client'
import { CircleDollarSign } from 'lucide-react'
import React, { useId, useState } from 'react'

export type BonusCalculatorProps = {
  casinoRollover: number
  currency: string
  defaultDeposit: number
  matchPercent: number
  maxBonus: number
  maxDeposit: number
  minDeposit: number
  sportsRollover: number
  step: number
  tip?: string | null
}

export const BonusCalculator: React.FC<BonusCalculatorProps> = ({
  casinoRollover,
  currency,
  defaultDeposit,
  matchPercent,
  maxBonus,
  maxDeposit,
  minDeposit,
  sportsRollover,
  step,
  tip,
}) => {
  const id = useId()
  const [deposit, setDeposit] = useState(Math.min(Math.max(defaultDeposit, minDeposit), maxDeposit))

  const money = (value: number) => `${currency}${Math.round(value).toLocaleString('en-US')}`
  const bonus = Math.min((deposit * matchPercent) / 100, maxBonus)
  const total = deposit + bonus

  return (
    <div className="review-calc">
      <p className="review-calc-title">
        <CircleDollarSign aria-hidden="true" className="review-calc-title-icon" />
        Bonus calculator
      </p>
      <label className="review-calc-label" htmlFor={id}>
        <span>Your first deposit</span>
        <span className="review-calc-amount">{money(deposit)}</span>
      </label>
      <input
        className="review-range"
        id={id}
        max={maxDeposit}
        min={minDeposit}
        onChange={(event) => setDeposit(Number(event.target.value))}
        step={step}
        type="range"
        value={deposit}
      />
      <div className="review-calc-scale">
        <span>{money(minDeposit)}</span>
        <span>{money(maxDeposit)}</span>
      </div>
      <dl className="review-calc-results">
        <div className="is-accent">
          <dt>Bonus</dt>
          <dd>{money(bonus)}</dd>
        </div>
        <div className="is-muted">
          <dt>You play with</dt>
          <dd>{money(total)}</dd>
        </div>
        <div className="is-outline">
          <dt>Sports wagering ({sportsRollover}×)</dt>
          <dd>{money(total * sportsRollover)}</dd>
        </div>
        <div className="is-outline">
          <dt>Casino wagering ({casinoRollover}×)</dt>
          <dd>{money(total * casinoRollover)}</dd>
        </div>
      </dl>
      {tip && (
        <p className="review-calc-tip">
          <b>Tip:</b> {tip}
        </p>
      )}
    </div>
  )
}
