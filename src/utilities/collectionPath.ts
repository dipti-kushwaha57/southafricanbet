/** Public URL prefix for an internal Payload relation. The `posts` collection's slug stays
 *  `posts` (admin, queries, relationships); only its public-facing URL uses `/news`. */
const COLLECTION_URL_PREFIX: Record<'posts' | 'reviews', string> = {
  posts: '/news',
  reviews: '/reviews',
}

export const getCollectionUrlPrefix = (relationTo: string): string =>
  COLLECTION_URL_PREFIX[relationTo as 'posts' | 'reviews'] ?? ''
