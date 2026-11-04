'use client'
import { ArrowRight, CalendarDays, Search, SearchX, Star, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { SearchResults } from '@/app/(frontend)/next/search/route'

import { initialsLogoSrc } from '@/components/BookmakerLogo'
import { reviewHref } from '@/utilities/reviewHref'

const SUGGESTIONS = ['Free spins', 'Welcome bonus', 'Rugby', 'Payout']

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const formatDate = (iso: string) => {
  const date = new Date(iso)
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

const Label: React.FC<{ children: React.ReactNode; count?: number }> = ({ children, count }) => (
  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
    {children}
    {count !== undefined && (
      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] tracking-wider text-accent-foreground">
        {count}
      </span>
    )}
  </p>
)

/** Dropdown search under the sticky header: live bookmaker + article results from /next/search. */
export const SearchPanel: React.FC<{ onClose: () => void; open: boolean }> = ({ onClose, open }) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Debounced fetch; an empty query loads the suggestions (top bookmakers, latest articles).
  useEffect(() => {
    if (!open) return
    const controller = new AbortController()
    setLoading(true)
    const timer = window.setTimeout(
      async () => {
        try {
          const response = await fetch(`/next/search?q=${encodeURIComponent(query.trim())}`, {
            signal: controller.signal,
          })
          if (!response.ok) throw new Error(String(response.status))
          setResults((await response.json()) as SearchResults)
          setFailed(false)
        } catch (error) {
          if ((error as Error).name !== 'AbortError') setFailed(true)
        } finally {
          if (!controller.signal.aborted) setLoading(false)
        }
      },
      query ? 200 : 0,
    )
    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [open, query])

  if (!open) return null

  const term = query.trim()
  const hasResults = !!results && (results.reviews.length > 0 || results.posts.length > 0)
  const empty = !!results && !hasResults && !loading && results.query === term

  return (
    <>
      <button
        aria-label="Close search"
        className="site-search-scrim"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      <div aria-label="Site search" className="site-search-panel" role="dialog">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (!term) return
              router.push(`/search?q=${encodeURIComponent(term)}`)
              onClose()
            }}
          >
            <div className="relative">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              />
              <input
                aria-label="Search bookmakers, sports, bonuses"
                autoComplete="off"
                className="w-full rounded-full border-2 bg-background py-3.5 pl-12 pr-14 text-base sm:pr-24 font-semibold outline-none transition placeholder:font-medium focus:border-primary"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search bookmakers, sports…"
                ref={inputRef}
                type="search"
                value={query}
              />
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                {query && (
                  <button
                    aria-label="Clear search"
                    className="grid h-7 w-7 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      setQuery('')
                      inputRef.current?.focus()
                    }}
                    type="button"
                  >
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="site-search-body mt-5" aria-busy={loading}>
            {failed && (
              <p className="rounded-2xl bg-accent p-4 text-sm font-semibold text-accent-foreground">
                Search is unavailable right now. Please try again in a moment.
              </p>
            )}

            {!failed && !results && <p className="py-6 text-sm font-semibold text-muted-foreground">Searching…</p>}

            {empty && (
              <div className="py-8 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-primary">
                  <SearchX aria-hidden="true" className="h-6 w-6" />
                </span>
                <p className="mt-4 font-display text-lg font-extrabold">No results for “{term}”</p>
                <p className="mt-1 text-sm text-muted-foreground">Check the spelling or try one of these:</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      className="rounded-full border bg-background px-3.5 py-2 text-sm font-semibold transition hover:border-primary hover:bg-accent hover:text-primary"
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      type="button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!failed && hasResults && results && (
              <div className={`grid gap-6 lg:grid-cols-[1.4fr_1fr]${loading ? ' opacity-60' : ''}`}>
                {results.reviews.length > 0 && (
                  <div className="min-w-0">
                    <Label count={term ? results.reviews.length : undefined}>
                      {term ? 'Bookmakers' : 'Top bookmakers'}
                    </Label>
                    <ul className="space-y-2.5">
                      {results.reviews.map((review) => (
                        <li key={review.id}>
                          <Link
                            className="group flex items-center gap-3 rounded-2xl border bg-background p-2.5 transition hover:border-primary"
                            href={reviewHref(review.slug)}
                            onClick={onClose}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt=""
                              className="h-11 w-11 shrink-0 rounded-xl bg-muted object-contain p-1"
                              src={review.logo || initialsLogoSrc(review.title, review.brandColor)}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-x-2">
                                <span className="font-bold group-hover:text-primary">{review.title}</span>
                                <span className="inline-flex items-center gap-1 text-sm font-bold">
                                  <Star aria-hidden="true" className="h-4 w-4 fill-gold text-gold" />
                                  {review.rating.toFixed(1)}
                                  <span className="font-medium text-muted-foreground">/5</span>
                                </span>
                              </div>
                              {review.bonusText && (
                                <p className="truncate text-xs text-muted-foreground">{review.bonusText}</p>
                              )}
                            </div>
                            <ArrowRight
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.posts.length > 0 && (
                  <div className="min-w-0">
                    <Label count={term ? results.posts.length : undefined}>
                      {term ? 'Articles' : 'Latest articles'}
                    </Label>
                    <ul className="space-y-2.5">
                      {results.posts.map((post) => (
                        <li key={post.id}>
                          <Link
                            className="group flex items-center gap-3 rounded-2xl border bg-background p-2.5 transition hover:border-primary"
                            href={`/posts/${post.slug}`}
                            onClick={onClose}
                          >
                            {post.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img alt="" className="h-12 w-[4.5rem] shrink-0 rounded-xl object-cover" src={post.image} />
                            ) : (
                              <span className="h-12 w-[4.5rem] shrink-0 rounded-xl bg-muted" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-primary">
                                {post.title}
                              </p>
                              <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                                {post.category}
                                {post.category && post.publishedAt && <span aria-hidden="true">·</span>}
                                {post.publishedAt && (
                                  <>
                                    <CalendarDays aria-hidden="true" className="h-3 w-3" />
                                    {formatDate(post.publishedAt)}
                                  </>
                                )}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {term && hasResults && (
              <div className="mt-5 text-center">
                <Link
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-bold transition hover:border-primary hover:text-primary"
                  href={`/search?q=${encodeURIComponent(term)}`}
                  onClick={onClose}
                >
                  See all results for “{term}” <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
