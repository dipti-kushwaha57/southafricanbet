import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type SearchResults = {
  posts: {
    category: string | null
    id: number
    image: string | null
    publishedAt: string | null
    slug: string
    title: string
  }[]
  query: string
  reviews: {
    bonusText: string | null
    brandColor: string | null
    id: number
    logo: string | null
    rating: number
    slug: string
    title: string
  }[]
}

const mediaUrl = (media: unknown): string | null =>
  media && typeof media === 'object' && 'url' in media && typeof media.url === 'string' ? media.url : null

/**
 * Live search for the header panel. Returns published bookmakers and articles whose text matches `q`
 * (or the top bookmakers / latest articles when `q` is empty, used as suggestions).
 */
export async function GET(request: Request): Promise<Response> {
  const q = (new URL(request.url).searchParams.get('q') || '').trim().slice(0, 80)
  const payload = await getPayload({ config: configPromise })

  const [reviews, posts] = await Promise.all([
    payload.find({
      collection: 'reviews',
      depth: 1,
      limit: 6,
      overrideAccess: false,
      pagination: false,
      sort: 'rank',
      ...(q
        ? {
            where: {
              or: [
                { title: { like: q } },
                { bonusText: { like: q } },
                { promotionalCode: { like: q } },
                { bestFor: { like: q } },
                { gamesOffered: { like: q } },
                { 'features.text': { like: q } },
                { whyWeLoveIt: { like: q } },
              ],
            },
          }
        : {}),
    }),
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 4,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      ...(q ? { where: { or: [{ title: { like: q } }, { 'meta.description': { like: q } }] } } : {}),
    }),
  ])

  const body: SearchResults = {
    posts: posts.docs.map((post) => {
      const category = post.categories?.[0]
      return {
        category: category && typeof category === 'object' ? category.title : null,
        id: post.id,
        image: mediaUrl(post.heroImage),
        publishedAt: post.publishedAt ?? null,
        slug: post.slug as string,
        title: post.title,
      }
    }),
    query: q,
    reviews: reviews.docs.map((review) => ({
      bonusText: review.bonusText ?? null,
      brandColor: review.brandColor ?? null,
      id: review.id,
      logo: mediaUrl(review.icon),
      rating: review.rating,
      slug: review.slug as string,
      title: review.title,
    })),
  }

  return Response.json(body, { headers: { 'Cache-Control': 'no-store' } })
}
