import { BadgeCheck, Phone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { cn } from '@/utilities/ui'
import { getCachedGlobal } from '@/utilities/getGlobals'
import styles from './Footer.module.css'
import { NewsletterForm } from './NewsletterForm'

const SOCIAL_PATHS: Record<string, { label: string; path: string }> = {
  facebook: {
    label: 'Facebook',
    path: 'M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z',
  },
  linkedin: {
    label: 'LinkedIn',
    path: 'M6.5 8.7H3.4V20h3.1V8.7zM5 4a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 5 4zm15.6 9.3c0-3-1.6-4.8-4.1-4.8-1.4 0-2.3.7-2.8 1.4V8.7h-3.1V20h3.1v-6c0-1.6.8-2.5 2-2.5s1.8.9 1.8 2.5V20h3.1v-6.7z',
  },
  x: {
    label: 'X',
    path: 'M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z',
  },
  youtube: {
    label: 'YouTube',
    path: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z',
  },
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const headerData = await getCachedGlobal('header', 1)()

  const columns = footerData?.columns || []
  const navItems = footerData?.navItems || []
  const authorities = footerData?.licensingAuthorities || []
  const newsletter = footerData?.newsletter
  const socialLinks = footerData?.socialLinks || []
  const helpline = footerData?.helplineNumber || headerData?.helplineNumber
  const logo = footerData?.logo && typeof footerData.logo === 'object' ? footerData.logo : null

  return (
    <footer className={cn('bg-footer', styles.footer)}>
      <div className={cn('stripe-sa', styles.flagStripe)} />
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div>
            {logo ? (
              <CmsImg alt="SouthAfricanBet.co.za" className={styles.logoImage} resource={logo} />
            ) : (
              <span className={styles.logoText}>
                SouthAfrican<span className={styles.logoAccent}>Bet</span>.co.za
              </span>
            )}
            {footerData?.description && <p className={styles.description}>{footerData.description}</p>}
            {helpline && (
              <a className={styles.helplineLink} href={`tel:${helpline.replace(/\s+/g, '')}`}>
                <Phone aria-hidden="true" className={styles.helplineIcon} /> Toll-Free Helpline: {helpline}
              </a>
            )}
          </div>
          {newsletter?.text && (
            <NewsletterForm
              buttonLabel={newsletter.buttonLabel}
              eyebrow={newsletter.heading}
              heading={newsletter.text}
              text={newsletter.disclaimer}
            />
          )}
        </div>

        <div className={styles.noticeBox}>
          <span className={styles.noticeBadge}>18+</span>
          <div className={styles.noticeBody}>
            <p className={styles.noticeTitle}>
              {footerData?.responsibleGamblingText || 'Gambling can be addictive, please play responsibly'}
            </p>
            {footerData?.responsibleGamblingSubtext && (
              <p className={styles.noticeSubtext}>{footerData.responsibleGamblingSubtext}</p>
            )}
          </div>
          {authorities.length > 0 && (
            <div className={styles.authorities}>
              {authorities.map((authority, i) => (
                <span className={styles.authorityBadge} key={authority.id ?? i}>
                  {i === 0 ? (
                    <ShieldCheck aria-hidden="true" className={styles.authorityIconPrimary} />
                  ) : (
                    <BadgeCheck aria-hidden="true" className={styles.authorityIconGold} />
                  )}
                  {authority.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.columnsGrid}>
          {columns.map((column, i) => (
            <nav aria-label={column.title} key={column.id ?? i}>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <span className={styles.columnRule} />
              <ul className={styles.columnList}>
                {(column.navItems || []).map(({ id, link }, j) => (
                  <li key={id ?? j}>
                    <SiteLink className={styles.columnLink} link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottomBar}>
          {navItems.length > 0 && (
            <nav aria-label="Legal" className={styles.legalNav}>
              {navItems.map(({ id, link }, i) => (
                <SiteLink className={styles.legalLink} key={id ?? i} link={link} />
              ))}
            </nav>
          )}
          <div className={styles.bottomRow}>
            <p className={styles.copyright}>
              {footerData?.copyright ||
                `© ${new Date().getFullYear()} SouthAfricanBet.co.za. All rights reserved. 18+ only. Terms and conditions apply.`}
            </p>
            {socialLinks.length > 0 && (
              <div className={styles.socialRow}>
                {socialLinks.map(({ id, platform, url }, i) => {
                  const social = SOCIAL_PATHS[platform]
                  if (!social) return null
                  return (
                    <Link aria-label={social.label} className={styles.socialLink} href={url} key={id ?? i}>
                      <svg aria-hidden="true" className={styles.socialIcon} viewBox="0 0 24 24">
                        <path d={social.path} />
                      </svg>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
