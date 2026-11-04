import type { PostsBlock as PostsBlockProps, Post } from '@/payload-types'

import configPromise from '@payload-config'
// import Link from 'next/link' // demo: re-enable once post detail pages are part of the demo
import { getPayload } from 'payload'
import React from 'react'

import { ArrowRight, ArrowUpRight, CalendarDays } from 'lucide-react'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { SectionEyebrow, SectionHeading, SectionIntro, SectionWrap, sectionStyles } from '@/components/Section'
import { cn } from '@/utilities/ui'
import styles from './PostsBlock.module.css'

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
    <div className={styles.meta}>
      {category && <span className={styles.metaCategory}>{category.title}</span>}
      {post.publishedAt && (
        <span className={styles.metaDate}>
          <CalendarDays aria-hidden="true" className={styles.metaDateIcon} /> {formatDate(post.publishedAt, !!featured)}
        </span>
      )}
    </div>
  )
}

// Demo: post detail pages aren't part of this demo yet — links disabled for now, restore when ready.
const ReadMore: React.FC<{ className: string; href: string }> = ({ className }) => (
  /*
  <Link className={className} href={href}>
    Read article <ArrowRight aria-hidden="true" className={styles.readMoreIcon} />
  </Link>
  */
  <span className={className}>
    Read article <ArrowRight aria-hidden="true" className={styles.readMoreIcon} />
  </span>
)

const FeaturedPost: React.FC<{ post: Post }> = ({ post }) => {
  const href = `/posts/${post.slug}`

  return (
    <article className={styles.featuredCard}>
      {/* Demo: link disabled for now, restore when post pages are part of the demo.
      <Link className={styles.featuredImageWrap} href={href}>
      */}
      <div className={styles.featuredImageWrap}>
        <CmsImg alt={post.title} className={styles.featuredImage} resource={post.heroImage} />
        <span className={styles.featuredBadge}>Featured</span>
      </div>
      {/* </Link> */}
      <div className={styles.featuredBody}>
        <Meta featured post={post} />
        <h3 className={styles.featuredTitle}>
          {/* Demo: link disabled for now, restore when post pages are part of the demo.
          <Link className="transition hover:text-primary" href={href}>
            {post.title}
          </Link>
          */}
          {post.title}
        </h3>
        {post.meta?.description && <p className={styles.featuredDescription}>{post.meta.description}</p>}
        <ReadMore className={cn(styles.readMore, styles.featuredReadMore)} href={href} />
      </div>
    </article>
  )
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const href = `/posts/${post.slug}`

  return (
    <article className={styles.card}>
      {/* Demo: link disabled for now, restore when post pages are part of the demo.
      <Link className={styles.cardImageWrap} href={href}>
      */}
      <div className={styles.cardImageWrap}>
        <CmsImg alt={post.title} className={styles.cardImage} resource={post.heroImage} />
      </div>
      {/* </Link> */}
      <div className={styles.cardBody}>
        <Meta post={post} />
        <h3 className={styles.cardTitle}>
          {/* Demo: link disabled for now, restore when post pages are part of the demo.
          <Link className="transition hover:text-primary" href={href}>
            {post.title}
          </Link>
          */}
          {post.title}
        </h3>
        {post.meta?.description && <p className={styles.cardDescription}>{post.meta.description}</p>}
        <ReadMore className={cn(styles.readMore, styles.cardReadMore)} href={href} />
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
      <div className={sectionStyles.container}>
        <div className={styles.headerRow}>
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <SectionHeading className={sectionStyles.headingBase} heading={heading} highlight={headingHighlight} />
            <SectionIntro className={cn(sectionStyles.introBase, sectionStyles.introConstrainedWide)}>
              {intro}
            </SectionIntro>
          </div>
          <SiteLink className={styles.viewAllButton} link={viewAllLink}>
            {viewAllLink?.label} <ArrowUpRight aria-hidden="true" className={styles.viewAllIcon} />
          </SiteLink>
        </div>

        <div className={styles.postsArea}>
          <FeaturedPost post={featuredPost} />
          {restPosts.length > 0 && (
            <div className={styles.cardsGrid}>
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
