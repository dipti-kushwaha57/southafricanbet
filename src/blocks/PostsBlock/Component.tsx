import type { PostsBlock as PostsBlockProps, Post } from '@/payload-types'

import configPromise from '@payload-config'
// import Link from 'next/link' // demo: re-enable once post detail pages are part of the demo
import { getPayload } from 'payload'
import React from 'react'

import { ArrowRight, ArrowUpRight, CalendarDays } from 'lucide-react'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { SectionEyebrow, SectionHeading, SectionIntro, SectionWrap } from '@/components/Section'
import { cn } from '@/utilities/ui'

async function getPosts(props: PostsBlockProps): Promise<Post[]> {
  const { mode, limit: limitFromProps, categories, selectedPosts } = props

  const payload = await getPayload({ config: configPromise })

  if (mode === 'selected') {
    if (!selectedPosts?.length) return []

    // Relationship values are only partially populated (collection `defaultPopulate`), so refetch them in full.
    const ids = selectedPosts.map((post) => (typeof post === 'object' ? post.id : post))
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: ids.length,
      pagination: false,
      where: { id: { in: ids } },
    })

    return ids.map((id) => result.docs.find((doc) => doc.id === id)).filter((doc): doc is Post => Boolean(doc))
  }
  const limit = limitFromProps || 5

  const flattenedCategories =
    mode === 'category'
      ? categories?.map((category) => (typeof category === 'object' ? category.id : category))
      : undefined

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit,
    sort: '-publishedAt',
    ...(flattenedCategories && flattenedCategories.length > 0
      ? { where: { categories: { in: flattenedCategories } } }
      : {}),
  })

  return result.docs
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatDate = (iso: string, withDay: boolean) => {
  const date = new Date(iso)
  const monthYear = `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
  return withDay ? `${date.getUTCDate()} ${monthYear}` : monthYear
}

const Meta: React.FC<{ featured?: boolean; post: Post }> = ({ featured, post }) => {
  const category =
    post.categories?.[0] && typeof post.categories[0] === 'object' ? post.categories[0] : null

  return (
    <div className="posts-meta">
      {category && <span className="posts-meta-category">{category.title}</span>}
      {post.publishedAt && (
        <span className="posts-meta-date">
          <CalendarDays aria-hidden="true" className="posts-meta-date-icon" /> {formatDate(post.publishedAt, !!featured)}
        </span>
      )}
    </div>
  )
}

// Demo: post detail pages aren't part of this demo yet — links disabled for now, restore when ready.
const ReadMore: React.FC<{ className: string; href: string }> = ({ className }) => (
  /*
  <Link className={className} href={href}>
    Read article <ArrowRight aria-hidden="true" className="posts-read-more-icon" />
  </Link>
  */
  <span className={className}>
    Read article <ArrowRight aria-hidden="true" className="posts-read-more-icon" />
  </span>
)

const FeaturedPost: React.FC<{ post: Post }> = ({ post }) => {
  const href = `/news/${post.slug}`

  return (
    <article className="posts-featured-card">
      {/* Demo: link disabled for now, restore when post pages are part of the demo.
      <Link className="posts-featured-image-wrap" href={href}>
      */}
      <div className="posts-featured-image-wrap">
        <CmsImg alt={post.title} className="posts-featured-image" resource={post.heroImage} />
        <span className="posts-featured-badge">Featured</span>
      </div>
      {/* </Link> */}
      <div className="posts-featured-body">
        <Meta featured post={post} />
        <h3 className="posts-featured-title">
          {/* Demo: link disabled for now, restore when post pages are part of the demo.
          <Link className="transition hover:text-primary" href={href}>
            {post.title}
          </Link>
          */}
          {post.title}
        </h3>
        {post.meta?.description && <p className="posts-featured-description">{post.meta.description}</p>}
        <ReadMore className={cn('posts-read-more', 'posts-featured-read-more')} href={href} />
      </div>
    </article>
  )
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const href = `/news/${post.slug}`

  return (
    <article className="posts-card">
      {/* Demo: link disabled for now, restore when post pages are part of the demo.
      <Link className="posts-card-image-wrap" href={href}>
      */}
      <div className="posts-card-image-wrap">
        <CmsImg alt={post.title} className="posts-card-image" resource={post.heroImage} />
      </div>
      {/* </Link> */}
      <div className="posts-card-body">
        <Meta post={post} />
        <h3 className="posts-card-title">
          {/* Demo: link disabled for now, restore when post pages are part of the demo.
          <Link className="transition hover:text-primary" href={href}>
            {post.title}
          </Link>
          */}
          {post.title}
        </h3>
        {post.meta?.description && <p className="posts-card-description">{post.meta.description}</p>}
        <ReadMore className={cn('posts-read-more', 'posts-card-read-more')} href={href} />
      </div>
    </article>
  )
}

export const PostsBlockComponent: React.FC<PostsBlockProps & { id?: string }> = async (props) => {
  const { anchorId, eyebrow, heading, headingHighlight, intro, tinted, viewAllLink } = props

  const posts = await getPosts(props)

  if (!posts.length) return null

  const [featuredPost, ...restPosts] = posts

  return (
    <SectionWrap anchorId={anchorId} tinted={tinted}>
      <div className="section-container">
        <div className="posts-header-row">
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <SectionHeading className="section-heading" heading={heading} highlight={headingHighlight} />
            <SectionIntro className={cn('section-intro', 'section-intro-constrained-wide')}>
              {intro}
            </SectionIntro>
          </div>
          <SiteLink className="posts-view-all-button" link={viewAllLink}>
            {viewAllLink?.label} <ArrowUpRight aria-hidden="true" className="posts-view-all-icon" />
          </SiteLink>
        </div>

        <div className="posts-area">
          <FeaturedPost post={featuredPost} />
          {restPosts.length > 0 && (
            <div className="posts-cards-grid">
              {restPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrap>
  )
}
