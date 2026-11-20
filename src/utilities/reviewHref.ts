/**
 * `/reviews/[slug]` now exists, so every "Play", "Review", bookmaker-name and bookmaker-logo
 * link that uses `reviewHref()` navigates there instead of falling back to `#`.
 */
export const REVIEW_PAGE_EXISTS = true

export const reviewHref = (slug: string): string => (REVIEW_PAGE_EXISTS ? `/reviews/${slug}` : '#')
