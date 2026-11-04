'use client'
import { BadgeCheck, ChevronDown, Copy } from 'lucide-react'
// import Link from 'next/link' // demo: re-enable once /reviews/[slug] exists
import React, { useState } from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import { BTN_OUTLINE_SM, BTN_PRIMARY } from '@/components/buttonClasses'
import { cn } from '@/utilities/ui'
// import { reviewHref } from '@/utilities/reviewHref' // demo: re-enable once /reviews/[slug] exists
import { Star } from 'lucide-react'

const PromoCode: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        } catch {
          window.prompt('Copy this promo code:', code)
        }
      }}
      type="button"
    >
      {copied ? 'Copied!' : `Code: ${code}`} <Copy aria-hidden="true" className="h-3.5 w-3.5" />
    </button>
  )
}

/** Ranked "#1 Pick" cards. Shows the first `initialVisible` and a toggle for the rest. */
export const CardGrid: React.FC<{ initialVisible?: number | null; reviews: Review[] }> = ({
  initialVisible,
  reviews,
}) => {
  const [showAll, setShowAll] = useState(false)

  const limit = initialVisible && initialVisible > 0 ? initialVisible : reviews.length
  const collapsible = reviews.length > limit

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" id="bookmaker-grid">
        {reviews.map((review, index) => {
          const hidden = !showAll && index >= limit

          return (
            <article
              className="group relative flex flex-col rounded-3xl border bg-card p-4 shadow-card transition hover:-translate-y-1 hover:border-primary sm:p-6"
              hidden={hidden}
              key={review.id}
            >
              {index < 3 && (
                <span className="absolute -top-3 right-5 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary-foreground">
                  #{index + 1} Pick
                </span>
              )}
              <div className="flex items-center gap-4">
                <BookmakerLogo className="h-16 w-16 rounded-2xl bg-muted object-contain p-1.5" review={review} />
                <div>
                  <h3 className="text-xl font-extrabold">
                    {/* Demo: review page isn't built yet — link disabled for now, restore when it exists.
                    <Link className="hover:text-primary" href={reviewHref(review.slug)}>
                      {review.title}
                    </Link>
                    */}
                    {review.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-bold">
                    <Star aria-hidden="true" className="h-4 w-4 fill-gold text-gold" />
                    {review.rating.toFixed(1)}
                    <span className="font-medium text-muted-foreground">/5</span>
                  </span>
                </div>
              </div>

              {review.bonusText && (
                <div className="mt-5 rounded-2xl bg-accent p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">Welcome offer</p>
                  <p className="mt-1 font-display text-lg font-bold leading-snug">{review.bonusText}</p>
                  {review.promotionalCode && (
                    <div className="mt-3">
                      <PromoCode code={review.promotionalCode} />
                    </div>
                  )}
                </div>
              )}

              {review.features && review.features.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm">
                  {review.features.map((feature, i) => (
                    <li className="flex gap-2" key={feature.id ?? i}>
                      <BadgeCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              )}

              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border p-2.5">
                  <dt className="text-muted-foreground">Min Deposit</dt>
                  <dd className="font-bold">{review.minDeposit || '—'}</dd>
                </div>
                <div className="rounded-xl border p-2.5">
                  <dt className="text-muted-foreground">Payout</dt>
                  <dd className="font-bold">{review.payoutTime || '—'}</dd>
                </div>
                <div className="rounded-xl border p-2.5 col-span-2">
                  <dt className="text-muted-foreground">Games</dt>
                  <dd className="font-bold">{review.gamesOffered || '—'}</dd>
                </div>
              </dl>

              <div className="mt-auto flex items-center gap-2 pt-5">
                {/* Demo: review page isn't built yet — links disabled for now, restore when it exists.
                <Link className={cn(BTN_PRIMARY, 'flex-1')} href={reviewHref(review.slug)}>
                  Play Now
                </Link>
                <Link className={BTN_OUTLINE_SM} href={reviewHref(review.slug)}>
                  Review
                </Link>
                */}
                <span className={cn(BTN_PRIMARY, 'flex-1')}>Play Now</span>
                <span className={BTN_OUTLINE_SM}>Review</span>
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">18+ Only | Play Responsibly</p>
            </article>
          )
        })}
      </div>

      {collapsible && (
        <div className="mt-6 text-center sm:mt-10">
          <button
            aria-expanded={showAll}
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2.5 text-sm font-bold transition hover:border-primary sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
            onClick={() => setShowAll((open) => !open)}
            type="button"
          >
            {showAll ? 'Show fewer' : `Show all ${reviews.length} bookmakers`}{' '}
            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition rotate-180 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
