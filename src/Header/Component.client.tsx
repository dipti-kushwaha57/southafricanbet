'use client'
import { ChevronDown, Clock, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type { Header } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'
import { getLinkHref } from '@/utilities/linkHref'
import { SearchPanel } from './SearchPanel'

interface HeaderClientProps {
  data: Header
}

/** Emoji shown in the round chip next to each menu item (picked via the link's "Icon"). */
const ICON_EMOJI: Record<string, string> = {
  gift: '🎁',
  help: '❓',
  home: '🏠',
  shield: '🛡️',
  sports: '⚽',
  star: '⭐',
  trophy: '🏆',
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null)
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const [navTop, setNavTop] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', menuOpen)
    return () => document.body.classList.remove('mobile-nav-open')
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const updateNavTop = () => {
      if (headerRef.current) setNavTop(headerRef.current.getBoundingClientRect().bottom)
    }

    updateNavTop()
    window.addEventListener('resize', updateNavTop)
    return () => window.removeEventListener('resize', updateNavTop)
  }, [menuOpen])

  const toggleMobileItem = (index: number) =>
    setOpenMobileIndex((current) => (current === index ? null : index))

  const navItems = data?.navItems || []
  const helpline = data?.helplineNumber

  return (
    <>
      <div className={cn('bg-footer', 'site-header-notice-bar')}>
        <div className="site-header-notice-row">
          <p className="site-header-notice-text">
            <span className="site-header-age-badge">18+</span>
            <span className="site-header-notice-full">
              {data?.noticeText || 'Gambling can be addictive. Please play responsibly.'}
            </span>
            <span className="site-header-notice-short">Play responsibly</span>
          </p>
          {helpline && (
            <p className="site-header-helpline">
              <Clock aria-hidden="true" className="site-header-helpline-icon" />
              Helpline:
              <a className="site-header-helpline-link" href={`tel:${helpline.replace(/\s+/g, '')}`}>
                {helpline}
              </a>
            </p>
          )}
        </div>
        <div className={cn('stripe-sa', 'site-header-flag-stripe')} />
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="site-header-row">
          <Link aria-label="SouthAfricanBet home" href="/">
            {data?.logo && typeof data.logo === 'object' ? (
              <CmsImg
                alt="SouthAfricanBet.co.za"
                className="site-header-logo-image"
                loading="eager"
                resource={data.logo}
              />
            ) : (
              <span className="site-header-logo-text">
                SouthAfrican<span className="site-header-logo-accent">Bet</span>
                <span className="site-header-logo-domain">.co.za</span>
              </span>
            )}
          </Link>

          <nav aria-label="Primary" className="site-header-nav" id="primary-navigation">
            {navItems.map(({ children, hasDropdown, iconImage, id, link }, i) => {
              const dropdown = hasDropdown || (children && children.length > 0)
              return (
                <div className="site-header-nav-item" key={id ?? i}>
                  <SiteLink className="site-header-nav-link" link={link}>
                    <span className="site-header-nav-icon-chip">
                      {iconImage && typeof iconImage === 'object' ? (
                        <CmsImg alt="" className="site-header-nav-icon-image" resource={iconImage} />
                      ) : (
                        link?.icon && ICON_EMOJI[link.icon]
                      )}
                    </span>
                    {link?.label}
                    {dropdown && <ChevronDown aria-hidden="true" className="site-header-nav-chevron" />}
                  </SiteLink>
                  {children && children.length > 0 && (
                    <div className="site-header-dropdown-panel">
                      <div className="site-header-dropdown-inner">
                        {children.map((child, j) => (
                          <Link className="site-header-dropdown-link" href={child.url} key={child.id ?? j}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {mounted &&
            createPortal(
              <>
                <button
                  aria-hidden={!menuOpen}
                  aria-label="Close menu"
                  className={cn('site-header-mobile-scrim', menuOpen && 'site-header-mobile-scrim-open')}
                  onClick={() => setMenuOpen(false)}
                  style={{ ['--mobile-nav-top' as string]: `${navTop}px` }}
                  tabIndex={menuOpen ? 0 : -1}
                  type="button"
                />

                <nav
                  aria-label="Mobile navigation"
                  className={cn('site-header-mobile-nav', menuOpen && 'site-header-mobile-nav-open')}
                  style={{ ['--mobile-nav-top' as string]: `${navTop}px` }}
                >
                  {navItems.map(({ children, iconImage, id, link }, i) => {
              const hasChildren = children && children.length > 0
              const isOpen = openMobileIndex === i
              const href = getLinkHref(link)
              const isActive = !hasChildren && !!href && pathname === href
              const icon =
                iconImage && typeof iconImage === 'object' ? (
                  <CmsImg alt="" className="site-header-nav-icon-image" resource={iconImage} />
                ) : (
                  link?.icon && ICON_EMOJI[link.icon]
                )

              if (!hasChildren) {
                return (
                  <div className="site-header-mobile-item" key={id ?? i}>
                    <Link
                      className={cn('site-header-mobile-link', isActive && 'site-header-mobile-link-active')}
                      href={href || '#'}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="site-header-nav-icon-chip">{icon}</span>
                      {link?.label}
                    </Link>
                  </div>
                )
              }

              return (
                <div className="site-header-mobile-item" key={id ?? i}>
                  <button
                    aria-expanded={isOpen}
                    className={cn('site-header-mobile-toggle', isOpen && 'site-header-mobile-toggle-open')}
                    onClick={() => toggleMobileItem(i)}
                    type="button"
                  >
                    <span className="site-header-nav-icon-chip">{icon}</span>
                    <span className="site-header-mobile-toggle-label">{link?.label}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('site-header-mobile-chevron', isOpen && 'site-header-mobile-chevron-open')}
                    />
                  </button>
                  <div className={cn('site-header-mobile-panel', isOpen && 'site-header-mobile-panel-open')}>
                    <div className="site-header-mobile-sub-list">
                      {children.map((child, j) => {
                        const childActive = pathname === child.url
                        return (
                          <Link
                            className={cn('site-header-mobile-sub', childActive && 'site-header-mobile-sub-active')}
                            href={child.url}
                            key={child.id ?? j}
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
                </nav>
              </>,
              document.body,
            )}

          <div className="site-header-actions">
            <button
              aria-expanded={searchOpen}
              aria-label="Search"
              className="site-header-icon-button"
              onClick={() => setSearchOpen((open) => !open)}
              type="button"
            >
              {searchOpen ? (
                <X aria-hidden="true" className="site-header-icon-button-icon" />
              ) : (
                <Search aria-hidden="true" className="site-header-icon-button-icon" />
              )}
            </button>
            {data?.ctaLink && getLinkHref(data.ctaLink) && (
              <SiteLink className="site-header-cta-button" link={data.ctaLink} />
            )}
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Menu'}
              className="site-header-menu-button"
              onClick={() => {
                setMenuOpen((open) => !open)
                setOpenMobileIndex(null)
              }}
              type="button"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="site-header-icon-button-icon" />
              ) : (
                <Menu aria-hidden="true" className="site-header-icon-button-icon" />
              )}
            </button>
          </div>
        </div>

        <SearchPanel onClose={closeSearch} open={searchOpen} />
      </header>
    </>
  )
}
