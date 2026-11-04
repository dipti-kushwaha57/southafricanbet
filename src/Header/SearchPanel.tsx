'use client'
import { ArrowRight, CalendarDays, Search, SearchX, Star, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { SearchResults } from '@/app/(frontend)/next/search/route'

import { initialsLogoSrc } from '@/components/BookmakerLogo'
import { cn } from '@/utilities/ui'
import { reviewHref } from '@/utilities/reviewHref'
import styles from './SearchPanel.module.css'

const SUGGESTIONS = ['Free spins', 'Welcome bonus', 'Rugby', 'Payout']

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const formatDate = (iso: string) => {
  const date = new Date(iso)
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

const Label: React.FC<{ children: React.ReactNode; count?: number }> = ({ children, count }) => (
  <p className={styles.resultsLabel}>
    {children}
    {count !== undefined && <span className={styles.resultsLabelCount}>{count}</span>}
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
      <button aria-label="Close search" className={styles.scrim} onClick={onClose} tabIndex={-1} type="button" />
      <div aria-label="Site search" className={styles.panel} role="dialog">
        <div className={styles.panelInner}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (!term) return
              router.push(`/search?q=${encodeURIComponent(term)}`)
              onClose()
            }}
          >
            <div className={styles.fieldWrap}>
              <Search aria-hidden="true" className={styles.fieldIcon} />
              <input
                aria-label="Search bookmakers, sports, bonuses"
                autoComplete="off"
                className={styles.field}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search bookmakers, sports…"
                ref={inputRef}
                type="search"
                value={query}
              />
              <div className={styles.fieldActions}>
                {query && (
                  <button
                    aria-label="Clear search"
                    className={styles.clearButton}
                    onClick={() => {
                      setQuery('')
                      inputRef.current?.focus()
                    }}
                    type="button"
                  >
                    <X aria-hidden="true" className={styles.clearButtonIcon} />
                  </button>
                )}
              </div>
            </div>
          </form>

          <div aria-busy={loading} className={styles.body}>
            {failed && <p className={styles.errorNotice}>Search is unavailable right now. Please try again in a moment.</p>}

            {!failed && !results && <p className={styles.loadingNotice}>Searching…</p>}

            {empty && (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>
                  <SearchX aria-hidden="true" className={styles.emptyIconGlyph} />
                </span>
                <p className={styles.emptyTitle}>No results for “{term}”</p>
                <p className={styles.emptyHint}>Check the spelling or try one of these:</p>
                <div className={styles.emptySuggestions}>
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      className={styles.suggestionButton}
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
              <div className={cn(styles.resultsGrid, loading && styles.resultsGridLoading)}>
                {results.reviews.length > 0 && (
                  <div className={styles.resultsColumn}>
                    <Label count={term ? results.reviews.length : undefined}>
                      {term ? 'Bookmakers' : 'Top bookmakers'}
                    </Label>
                    <ul className={styles.resultsList}>
                      {results.reviews.map((review) => (
                        <li key={review.id}>
                          <Link className={styles.resultRow} href={reviewHref(review.slug)} onClick={onClose}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt=""
                              className={styles.resultLogo}
                              src={review.logo || initialsLogoSrc(review.title, review.brandColor)}
                            />
                            <div className={styles.resultInfo}>
                              <div className={styles.resultInfoTop}>
                                <span className={styles.resultName}>{review.title}</span>
                                <span className={styles.resultRating}>
                                  <Star aria-hidden="true" className={styles.resultStarIcon} />
                                  {review.rating.toFixed(1)}
                                  <span className={styles.resultRatingOutOf}>/5</span>
                                </span>
                              </div>
                              {review.bonusText && <p className={styles.resultBonus}>{review.bonusText}</p>}
                            </div>
                            <ArrowRight aria-hidden="true" className={styles.resultArrow} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.posts.length > 0 && (
                  <div className={styles.resultsColumn}>
                    <Label count={term ? results.posts.length : undefined}>
                      {term ? 'Articles' : 'Latest articles'}
                    </Label>
                    <ul className={styles.resultsList}>
                      {results.posts.map((post) => (
                        <li key={post.id}>
                          <Link className={styles.resultRow} href={`/posts/${post.slug}`} onClick={onClose}>
                            {post.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img alt="" className={styles.postThumb} src={post.image} />
                            ) : (
                              <span className={styles.postThumbPlaceholder} />
                            )}
                            <div className={styles.resultInfo}>
                              <p className={styles.postTitle}>{post.title}</p>
                              <p className={styles.postMeta}>
                                {post.category}
                                {post.category && post.publishedAt && <span aria-hidden="true">·</span>}
                                {post.publishedAt && (
                                  <>
                                    <CalendarDays aria-hidden="true" className={styles.postMetaIcon} />
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
              <div className={styles.seeAll}>
                <Link className={styles.seeAllLink} href={`/search?q=${encodeURIComponent(term)}`} onClick={onClose}>
                  See all results for “{term}” <ArrowRight aria-hidden="true" className={styles.seeAllIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
