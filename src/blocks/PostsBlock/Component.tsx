import type { PostsBlock as PostsBlockProps, Post } from '@/payload-types'

import configPromise from '@payload-config'
// import Link from 'next/link' // demo: re-enable once post detail pages are part of the demo
import { getPayload } from 'payload'
import React from 'react'

import { ArrowRight, ArrowUpRight, CalendarDays } from 'lucide-react'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { SectionEyebrow, SectionHeading, SectionIntro, SectionWrap } from '@/components/Section'

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
    <div className="flex items-center gap-3">
      {category && (
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-accent-foreground">
          {category.title}
        </span>
      )}
      {post.publishedAt && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" /> {formatDate(post.publishedAt, !!featured)}
        </span>
      )}
    </div>
  )
}

// Demo: post detail pages aren't part of this demo yet — links disabled for now, restore when ready.
const ReadMore: React.FC<{ className: string; href: string }> = ({ className }) => (
  /*
  <Link className={className} href={href}>
    Read article{' '}
    <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
  </Link>
  */
  <span className={className}>
    Read article <ArrowRight aria-hidden="true" className="h-4 w-4" />
  </span>
)

const FeaturedPost: React.FC<{ post: Post }> = ({ post }) => {
  const href = `/posts/${post.slug}`

  return (
    <article className="group overflow-hidden rounded-3xl border bg-card shadow-card transition hover:-translate-y-1 hover:border-primary lg:grid lg:grid-cols-[1.45fr_1fr]">
      {/* Demo: link disabled for now, restore when post pages are part of the demo.
      <Link className="relative block aspect-[16/9] overflow-hidden lg:aspect-auto lg:h-full" href={href}>
      */}
      <div className="relative block aspect-[16/9] overflow-hidden lg:aspect-auto lg:h-full">
        <CmsImg
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          resource={post.heroImage}
        />
        <span className="absolute left-4 top-4 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary-foreground shadow-glow">
          Featured
        </span>
      </div>
      {/* </Link> */}
      <div className="flex flex-col p-6 md:p-8">
        <Meta featured post={post} />
        <h3 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl">
          {/* Demo: link disabled for now, restore when post pages are part of the demo.
          <Link className="transition hover:text-primary" href={href}>
            {post.title}
          </Link>
          */}
          {post.title}
        </h3>
        {post.meta?.description && <p className="mt-3 text-muted-foreground">{post.meta.description}</p>}
        <ReadMore className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-primary" href={href} />
      </div>
    </article>
  )
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const href = `/posts/${post.slug}`

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-card transition hover:-translate-y-1 hover:border-primary">
      {/* Demo: link disabled for now, restore when post pages are part of the demo.
      <Link className="block aspect-[16/9] overflow-hidden" href={href}>
      */}
      <div className="block aspect-[16/9] overflow-hidden">
        <CmsImg
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          resource={post.heroImage}
        />
      </div>
      {/* </Link> */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Meta post={post} />
        <h3 className="mt-3 text-lg font-extrabold leading-snug">
          {/* Demo: link disabled for now, restore when post pages are part of the demo.
          <Link className="transition hover:text-primary" href={href}>
            {post.title}
          </Link>
          */}
          {post.title}
        </h3>
        {post.meta?.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.meta.description}</p>
        )}
        <ReadMore className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-bold text-primary" href={href} />
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <SectionHeading
              className="text-3xl font-extrabold md:text-5xl"
              heading={heading}
              highlight={headingHighlight}
            />
            <SectionIntro className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{intro}</SectionIntro>
          </div>
          <SiteLink
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-bold transition hover:border-primary hover:text-primary"
            link={viewAllLink}
          >
            {viewAllLink?.label} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </SiteLink>
        </div>

        <div className="mt-10 space-y-6">
          <FeaturedPost post={featuredPost} />
          {restPosts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
