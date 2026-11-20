import { Star } from 'lucide-react'
import React from 'react'

const STARS = [0, 1, 2, 3, 4]

/** Gold stars partially filled to `rating` (out of 5). */
export const ReviewStars: React.FC<{ className?: string; rating: number }> = ({ className, rating }) => (
  <span aria-label={`${rating} out of 5`} className={className ? `review-stars ${className}` : 'review-stars'}>
    <span className="review-stars-row">
      {STARS.map((i) => (
        <Star aria-hidden="true" className="review-star-empty" key={i} />
      ))}
    </span>
    <span className="review-stars-row review-stars-fill" style={{ width: `${(Math.min(rating, 5) / 5) * 100}%` }}>
      {STARS.map((i) => (
        <Star aria-hidden="true" className="review-star-full" key={i} />
      ))}
    </span>
  </span>
)
