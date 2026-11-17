import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'

const RESULTS_PER_PAGE = 9

type Args = {
  searchParams: Promise<{
    page?: string
    q?: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { page, q: query } = await searchParamsPromise
  const sanitizedPage = Number(page) > 0 ? Number(page) : 1
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: RESULTS_PER_PAGE,
    page: sanitizedPage,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <>
      <PageClient />

      <div className="search-page-header section-container text-center">
        <h1 className="search-page-title">Search</h1>

        <div className="search-page-form">
          <Search />
        </div>
        {query && (
          <p className="search-page-query-note">
            Showing results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      <section className="section-wrap">
        <div className="section-container archive-toolbar">
          {posts.totalDocs} result{posts.totalDocs === 1 ? '' : 's'} found
        </div>

        {posts.totalDocs > 0 ? (
          <CollectionArchive posts={posts.docs as CardPostData[]} />
        ) : (
          <div className="section-container">
            <div className="archive-empty">No results found.</div>
          </div>
        )}

        {posts.page && posts.totalPages > 1 && (
          <div className="section-container">
            <Pagination
              basePath="/search"
              page={posts.page}
              query={query ? { q: query } : {}}
              totalPages={posts.totalPages}
            />
          </div>
        )}
      </section>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | SouthAfricanBet.co.za`,
  }
}
