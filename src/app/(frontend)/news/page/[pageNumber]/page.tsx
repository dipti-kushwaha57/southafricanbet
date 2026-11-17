import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
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

        {posts?.page && posts?.totalPages > 1 && (
          <div className="section-container">
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </section>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Latest Betting News – Page ${pageNumber || ''} | SouthAfricanBet.co.za`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
