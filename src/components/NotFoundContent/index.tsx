import { ArrowRight, Home, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const NotFoundContent: React.FC = () => (
  <div className="bg-hero not-found-page">
    <div className="not-found-inner">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">This page took a bad bounce.</h1>
      <p className="not-found-text">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Try heading back
        home, or search for what you need.
      </p>

      <div className="not-found-actions">
        <Link className="hero-cta-button hero-cta-solid" href="/">
          <Home aria-hidden="true" className="hero-cta-icon" /> Go to Homepage
        </Link>
        <Link className="hero-cta-button hero-cta-outline" href="/news">
          Browse Latest News <ArrowRight aria-hidden="true" className="hero-cta-icon hero-cta-icon-outline" />
        </Link>
      </div>

      <Link className="not-found-search-link" href="/search">
        <SearchIcon aria-hidden="true" className="not-found-search-icon" /> Or search the site
      </Link>
    </div>
  </div>
)
