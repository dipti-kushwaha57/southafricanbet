'use client'
import { ChevronDown, Clock, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'

import type { Header } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
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

const NAV_LINK =
  'flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground'

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  const navItems = data?.navItems || []
  const helpline = data?.helplineNumber

  return (
    <>
      <div className="bg-footer text-xs text-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <p className="flex items-center gap-2 font-semibold">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-white/40 text-[9px] font-extrabold">
              18+
            </span>
            <span className="hidden sm:inline">
              {data?.noticeText || 'Gambling can be addictive. Please play responsibly.'}
            </span>
            <span className="sm:hidden">Play responsibly</span>
          </p>
          {helpline && (
            <p className="flex items-center gap-2 font-semibold">
              <Clock aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
              Helpline:
              <a className="text-white hover:underline" href={`tel:${helpline.replace(/\s+/g, '')}`}>
                {helpline}
              </a>
            </p>
          )}
        </div>
        <div className="stripe-sa h-0.5" />
      </div>

      <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link aria-label="SouthAfricanBet home" href="/">
            {data?.logo && typeof data.logo === 'object' ? (
              <CmsImg alt="SouthAfricanBet.co.za" className="h-9 md:h-10 w-auto" loading="eager" resource={data.logo} />
            ) : (
              <span className="font-display text-xl font-extrabold">
                SouthAfrican<span className="text-primary">Bet</span>
                <span className="text-muted-foreground">.co.za</span>
              </span>
            )}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex" id="primary-navigation">
            {navItems.map(({ children, hasDropdown, iconImage, id, link }, i) => {
              const dropdown = hasDropdown || (children && children.length > 0)
              return (
                <div className="group relative" key={id ?? i}>
                  <SiteLink className={NAV_LINK} link={link}>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[13px]">
                      {iconImage && typeof iconImage === 'object' ? (
                        <CmsImg alt="" className="h-4 w-4 object-contain" resource={iconImage} />
                      ) : (
                        link?.icon && ICON_EMOJI[link.icon]
                      )}
                    </span>
                    {link?.label}
                    {dropdown && (
                      <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                    )}
                  </SiteLink>
                  {children && children.length > 0 && (
                    <div className="nav-dropdown-panel pointer-events-none absolute left-0 top-full z-50 w-56 translate-y-1 pt-2 opacity-0 transition duration-200 ease-out group-focus-within:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="rounded-2xl border bg-card p-2 shadow-card">
                        {children.map((child, j) => (
                          <Link
                            className="block rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-accent hover:text-accent-foreground"
                            href={child.url}
                            key={child.id ?? j}
                          >
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

          <nav aria-label="Mobile navigation" className="mobile-navigation" hidden={!menuOpen}>
            {navItems.map(({ children, iconImage, id, link }, i) => (
              <div className="group relative" key={id ?? i}>
                <Link className={NAV_LINK} href={getLinkHref(link) || '#'} onClick={() => setMenuOpen(false)}>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[13px]">
                    {iconImage && typeof iconImage === 'object' ? (
                      <CmsImg alt="" className="h-4 w-4 object-contain" resource={iconImage} />
                    ) : (
                      link?.icon && ICON_EMOJI[link.icon]
                    )}
                  </span>
                  {link?.label}
                </Link>
                {children?.map((child, j) => (
                  <Link
                    className="mobile-sub text-muted-foreground"
                    href={child.url}
                    key={child.id ?? j}
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-expanded={searchOpen}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full border bg-card transition hover:border-primary hover:text-primary"
              onClick={() => setSearchOpen((open) => !open)}
              type="button"
            >
              {searchOpen ? (
                <X aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Search aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
            {data?.ctaLink && getLinkHref(data.ctaLink) && (
              <SiteLink
                className="hidden rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow sm:inline-flex"
                link={data.ctaLink}
              />
            )}
            <button
              aria-expanded={menuOpen}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full border xl:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <Menu aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <SearchPanel onClose={closeSearch} open={searchOpen} />
      </header>
    </>
  )
}
