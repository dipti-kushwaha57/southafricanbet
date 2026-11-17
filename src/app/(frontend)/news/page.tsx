import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <>
      <PageClient />

      <div className="bg-hero low-impact-hero">
        <div className="low-impact-hero-inner">
          <h1 className="low-impact-hero-title">Latest News</h1>
          <p className="low-impact-hero-text">
            Stay up to date with the latest betting, bonus and sportsbook news from South Africa.
          </p>
        </div>
      </div>

      <section className="section-wrap">
        <div className="section-container archive-toolbar">
          <PageRange
            collection="posts"
            collectionLabels={{ plural: 'news articles', singular: 'news article' }}
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={posts.docs} />

        {posts.totalPages > 1 && posts.page && (
          <div className="section-container">
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </section>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Latest Betting News | SouthAfricanBet.co.za',
    description:
      'Stay up to date with the latest betting, bonus and sportsbook news from South Africa.',
  }
}
