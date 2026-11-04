import { ArrowRight, Star, Trophy } from 'lucide-react'
// import Link from 'next/link' // demo: re-enable once /reviews/[slug] exists
import React from 'react'

import type { Review } from '@/payload-types'

import { BookmakerLogo } from '@/components/BookmakerLogo'
import { BTN_PRIMARY } from '@/components/buttonClasses'
import { CmsImg } from '@/components/CmsImg'
import { cn } from '@/utilities/ui'
// import { reviewHref } from '@/utilities/reviewHref' // demo: re-enable once /reviews/[slug] exists

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <span aria-label={`${rating} out of 5`} className="relative inline-flex">
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star aria-hidden="true" className="h-5 w-5 text-gold/30" key={i} />
      ))}
    </span>
    <span className="absolute inset-0 flex gap-0.5 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star aria-hidden="true" className="h-5 w-5 shrink-0 fill-gold text-gold" key={i} />
      ))}
    </span>
  </span>
)

/** Large "hand-picked" rows: logo + rank, rating, best-for, offer, payments, CTAs and a stats strip. */
export const DetailedList: React.FC<{ reviews: Review[] }> = ({ reviews }) => (
  <div className="space-y-6">
    {reviews.map((review) => {
      const payments = (review.paymentMethods || []).filter(
        (method) => method.icon && typeof method.icon === 'object',
      )

      return (
        <article
          className="group relative overflow-hidden rounded-3xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:border-primary/60"
          key={review.id}
        >
          {review.badge && (
            <span className="absolute right-0 top-0 z-10 rounded-bl-2xl bg-gradient-primary px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-primary-foreground sm:px-4 sm:py-1.5 sm:text-[11px]">
              {review.badge}
            </span>
          )}
          <div className="grid items-center gap-4 p-4 sm:gap-6 sm:p-5 md:p-6 lg:grid-cols-[230px_1fr_220px] lg:gap-8">
            <div className="flex flex-wrap items-center gap-3 pr-14 sm:gap-5 sm:pr-0 lg:flex-col lg:items-start lg:gap-4">
              <BookmakerLogo
                className="h-16 w-16 shrink-0 rounded-2xl bg-muted object-contain p-1.5 shadow-card ring-1 ring-black/5 sm:h-24 sm:w-24"
                review={review}
              />
              <div>
                <h3 className="text-xl font-extrabold leading-tight">{review.title}</h3>
                <div className="mt-1.5 flex items-center gap-3 sm:mt-2">
                  <span className="font-display text-4xl font-extrabold leading-none">{review.rating.toFixed(1)}</span>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:border-x lg:px-8">
              {review.bestFor && (
                <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                  <Trophy aria-hidden="true" className="h-3.5 w-3.5 text-primary" /> Best for: {review.bestFor}
                </p>
              )}
              {review.bonusText && (
                <p className="mt-2 font-display text-lg font-extrabold leading-tight sm:mt-3 sm:text-2xl md:text-[1.7rem]">
                  {review.bonusText}
                </p>
              )}
              {payments.length > 0 && (
                <div
                  aria-label="Accepted payment methods"
                  className="mt-3 flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border bg-muted p-2 sm:mt-4 sm:flex-wrap sm:overflow-visible"
                >
                  {payments.map((method, i) => (
                    <CmsImg
                      alt={method.name}
                      className="h-8 w-auto shrink-0 rounded-md bg-white shadow-sm ring-1 ring-black/5"
                      key={method.id ?? i}
                      resource={method.icon}
                      title={method.name}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              {/* Demo: review page isn't built yet — links disabled for now, restore when it exists.
              <Link className={cn(BTN_PRIMARY, 'flex-1 !py-2.5 text-sm sm:!py-3.5 sm:text-base')} href={reviewHref(review.slug)}>
                Play Now
              </Link>
              <Link
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-neutral-900 shadow-sm transition hover:-translate-y-0.5 hover:brightness-105 sm:px-5 sm:py-3.5 sm:text-base"
                href={reviewHref(review.slug)}
              >
                Read Review <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              */}
              <span className={cn(BTN_PRIMARY, 'flex-1 !py-2.5 text-sm sm:!py-3.5 sm:text-base')}>Play Now</span>
              <span className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-neutral-900 shadow-sm sm:px-5 sm:py-3.5 sm:text-base">
                Read Review <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>
          </div>

          <dl className="grid grid-cols-2 divide-x divide-y border-t md:divide-y-0 bg-muted/70 text-center text-sm md:grid-cols-4 md:divide-x">
            <div className="px-2.5 py-2 sm:px-3 sm:py-3.5">
              <dt className="block text-xs text-muted-foreground md:inline md:text-sm">Win Rate: </dt>
              <dd className="block font-bold md:inline">{review.winRate || '—'}</dd>
            </div>
            <div className="px-2.5 py-2 sm:px-3 sm:py-3.5">
              <dt className="block text-xs text-muted-foreground md:inline md:text-sm">Payout Speed: </dt>
              <dd className="block font-bold md:inline">{review.payoutTime || '—'}</dd>
            </div>
            <div className="px-2.5 py-2 sm:px-3 sm:py-3.5">
              <dt className="block text-xs text-muted-foreground md:inline md:text-sm">Wagering: </dt>
              <dd className="block font-bold md:inline">{review.wagering || '—'}</dd>
            </div>
            <div className="flex items-center justify-center px-2.5 py-2 font-semibold sm:px-3 sm:py-3.5">
              <span>
                <span className="font-extrabold text-primary">18+</span> | Play responsibly.
              </span>
            </div>
          </dl>
        </article>
      )
    })}
  </div>
)
