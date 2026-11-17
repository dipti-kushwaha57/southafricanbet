import { BadgeCheck, Phone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { CmsImg } from '@/components/CmsImg'
import { cn } from '@/utilities/ui'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { FooterColumn } from './FooterColumn'
import { FooterLegalNav } from './FooterLegalNav'
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
    <footer className={cn('bg-footer', 'site-footer')}>
      <div className={cn('stripe-sa', 'site-footer-flag-stripe')} />
      <div className="site-footer-container">
        <div className="site-footer-top-row">
          <div>
            {logo ? (
              <CmsImg alt="SouthAfricanBet.co.za" className="site-footer-logo-image" resource={logo} />
            ) : (
              <span className="site-footer-logo-text">
                SouthAfrican<span className="site-footer-logo-accent">Bet</span>.co.za
              </span>
            )}
            {footerData?.description && <p className="site-footer-description">{footerData.description}</p>}
            {helpline && (
              <a className="site-footer-helpline-link" href={`tel:${helpline.replace(/\s+/g, '')}`}>
                <Phone aria-hidden="true" className="site-footer-helpline-icon" /> Toll-Free Helpline: {helpline}
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

        <div className="site-footer-notice-box">
          <span className="site-footer-notice-badge">18+</span>
          <div className="site-footer-notice-body">
            <p className="site-footer-notice-title">
              {footerData?.responsibleGamblingText || 'Gambling can be addictive, please play responsibly'}
            </p>
            {footerData?.responsibleGamblingSubtext && (
              <p className="site-footer-notice-subtext">{footerData.responsibleGamblingSubtext}</p>
            )}
          </div>
          {authorities.length > 0 && (
            <div className="site-footer-authorities">
              {authorities.map((authority, i) => (
                <span className="site-footer-authority-badge" key={authority.id ?? i}>
                  {i === 0 ? (
                    <ShieldCheck aria-hidden="true" className="site-footer-authority-icon-primary" />
                  ) : (
                    <BadgeCheck aria-hidden="true" className="site-footer-authority-icon-gold" />
                  )}
                  {authority.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="site-footer-columns-grid">
          {columns.map((column, i) => (
            <FooterColumn column={column} key={column.id ?? i} />
          ))}
        </div>

        <div className="site-footer-bottom-bar">
          {navItems.length > 0 && <FooterLegalNav items={navItems} />}
          <div className="site-footer-bottom-row">
            <p className="site-footer-copyright">
              {footerData?.copyright ||
                `© ${new Date().getFullYear()} SouthAfricanBet.co.za. All rights reserved. 18+ only. Terms and conditions apply.`}
            </p>
            {socialLinks.length > 0 && (
              <div className="site-footer-social-row">
                {socialLinks.map(({ id, platform, url }, i) => {
                  const social = SOCIAL_PATHS[platform]
                  if (!social) return null
                  return (
                    <Link aria-label={social.label} className="site-footer-social-link" href={url} key={id ?? i}>
                      <svg aria-hidden="true" className="site-footer-social-icon" viewBox="0 0 24 24">
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
