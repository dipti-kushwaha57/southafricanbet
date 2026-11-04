'use client'
import { ChevronDown, Clock, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'

import type { Header } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'
import { getLinkHref } from '@/utilities/linkHref'
import styles from './Header.module.css'
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
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  const navItems = data?.navItems || []
  const helpline = data?.helplineNumber

  return (
    <>
      <div className={cn('bg-footer', styles.noticeBar)}>
        <div className={styles.noticeRow}>
          <p className={styles.noticeText}>
            <span className={styles.ageBadge}>18+</span>
            <span className={styles.noticeFull}>
              {data?.noticeText || 'Gambling can be addictive. Please play responsibly.'}
            </span>
            <span className={styles.noticeShort}>Play responsibly</span>
          </p>
          {helpline && (
            <p className={styles.helpline}>
              <Clock aria-hidden="true" className={styles.helplineIcon} />
              Helpline:
              <a className={styles.helplineLink} href={`tel:${helpline.replace(/\s+/g, '')}`}>
                {helpline}
              </a>
            </p>
          )}
        </div>
        <div className={cn('stripe-sa', styles.flagStripe)} />
      </div>

      <header className={styles.header}>
        <div className={styles.headerRow}>
          <Link aria-label="SouthAfricanBet home" href="/">
            {data?.logo && typeof data.logo === 'object' ? (
              <CmsImg alt="SouthAfricanBet.co.za" className={styles.logoImage} loading="eager" resource={data.logo} />
            ) : (
              <span className={styles.logoText}>
                SouthAfrican<span className={styles.logoAccent}>Bet</span>
                <span className={styles.logoDomain}>.co.za</span>
              </span>
            )}
          </Link>

          <nav aria-label="Primary" className={styles.nav} id="primary-navigation">
            {navItems.map(({ children, hasDropdown, iconImage, id, link }, i) => {
              const dropdown = hasDropdown || (children && children.length > 0)
              return (
                <div className={styles.navItem} key={id ?? i}>
                  <SiteLink className={styles.navLink} link={link}>
                    <span className={styles.navIconChip}>
                      {iconImage && typeof iconImage === 'object' ? (
                        <CmsImg alt="" className={styles.navIconImage} resource={iconImage} />
                      ) : (
                        link?.icon && ICON_EMOJI[link.icon]
                      )}
                    </span>
                    {link?.label}
                    {dropdown && <ChevronDown aria-hidden="true" className={styles.navChevron} />}
                  </SiteLink>
                  {children && children.length > 0 && (
                    <div className={styles.dropdownPanel}>
                      <div className={styles.dropdownInner}>
                        {children.map((child, j) => (
                          <Link className={styles.dropdownLink} href={child.url} key={child.id ?? j}>
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

          <nav aria-label="Mobile navigation" className={styles.mobileNav} hidden={!menuOpen}>
            {navItems.map(({ children, iconImage, id, link }, i) => (
              <div className={styles.mobileItem} key={id ?? i}>
                <Link className={styles.navLink} href={getLinkHref(link) || '#'} onClick={() => setMenuOpen(false)}>
                  <span className={styles.navIconChip}>
                    {iconImage && typeof iconImage === 'object' ? (
                      <CmsImg alt="" className={styles.navIconImage} resource={iconImage} />
                    ) : (
                      link?.icon && ICON_EMOJI[link.icon]
                    )}
                  </span>
                  {link?.label}
                </Link>
                {children?.map((child, j) => (
                  <Link
                    className={styles.mobileSub}
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

          <div className={styles.actions}>
            <button
              aria-expanded={searchOpen}
              aria-label="Search"
              className={styles.iconButton}
              onClick={() => setSearchOpen((open) => !open)}
              type="button"
            >
              {searchOpen ? (
                <X aria-hidden="true" className={styles.iconButtonIcon} />
              ) : (
                <Search aria-hidden="true" className={styles.iconButtonIcon} />
              )}
            </button>
            {data?.ctaLink && getLinkHref(data.ctaLink) && (
              <SiteLink className={styles.ctaButton} link={data.ctaLink} />
            )}
            <button
              aria-expanded={menuOpen}
              aria-label="Menu"
              className={styles.menuButton}
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <Menu aria-hidden="true" className={styles.iconButtonIcon} />
            </button>
          </div>
        </div>

        <SearchPanel onClose={closeSearch} open={searchOpen} />
      </header>
    </>
  )
}
