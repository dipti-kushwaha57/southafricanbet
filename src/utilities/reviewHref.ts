/**
 * `/reviews/[slug]` doesn't exist as a route yet, so every link to it 404s. Until that page
 * is built, every "Play", "Review", bookmaker-name and bookmaker-logo link falls back to `#`
 * instead of navigating anywhere.
 *
 * Once the review detail page exists, flip this one flag — every link that uses `reviewHref()`
 * fixes itself.
 */
export const REVIEW_PAGE_EXISTS = false

export const reviewHref = (slug: string): string => (REVIEW_PAGE_EXISTS ? `/reviews/${slug}` : '#')
