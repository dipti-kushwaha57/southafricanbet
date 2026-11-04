import { BadgeCheck, Phone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { getCachedGlobal } from '@/utilities/getGlobals'
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
    <footer className="bg-footer text-white/70">
      <div className="stripe-sa h-1" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            {logo ? (
              <CmsImg alt="SouthAfricanBet.co.za" className="h-12 w-auto" resource={logo} />
            ) : (
              <span className="font-display text-2xl font-extrabold text-white">
                SouthAfrican<span className="text-primary">Bet</span>.co.za
              </span>
            )}
            {footerData?.description && (
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">{footerData.description}</p>
            )}
            {helpline && (
              <a
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-primary"
                href={`tel:${helpline.replace(/\s+/g, '')}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-gold" /> Toll-Free Helpline: {helpline}
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

        <div className="flex flex-col items-center gap-5 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5 text-center md:flex-row md:p-6 md:text-left">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-white/80 font-display text-lg font-extrabold text-white">
            18+
          </span>
          <div className="flex-1">
            <p className="text-sm font-extrabold uppercase tracking-wide text-emerald-400">
              {footerData?.responsibleGamblingText || 'Gambling can be addictive, please play responsibly'}
            </p>
            {footerData?.responsibleGamblingSubtext && (
              <p className="mt-1 text-sm text-white/60">{footerData.responsibleGamblingSubtext}</p>
            )}
          </div>
          {authorities.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {authorities.map((authority, i) => (
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white"
                  key={authority.id ?? i}
                >
                  {i === 0 ? (
                    <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <BadgeCheck aria-hidden="true" className="h-4 w-4 text-gold" />
                  )}
                  {authority.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4">
          {columns.map((column, i) => (
            <nav aria-label={column.title} key={column.id ?? i}>
              <h3 className="footer-col-title text-sm font-extrabold uppercase tracking-[0.14em] text-white">{column.title}</h3>
              <span className="mt-3 block h-0.5 w-8 rounded-full bg-primary" />
              <ul className="mt-5 space-y-3">
                {(column.navItems || []).map(({ id, link }, j) => (
                  <li key={id ?? j}>
                    <SiteLink className="text-sm text-white/60 transition hover:translate-x-0.5 hover:text-white" link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/10 py-6">
          {navItems.length > 0 && (
            <nav
              aria-label="Legal"
              className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/70 md:justify-start"
            >
              {navItems.map(({ id, link }, i) => (
                <SiteLink className="transition hover:text-white" key={id ?? i} link={link} />
              ))}
            </nav>
          )}
          <div className="mt-5 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-xs text-white/50 md:text-left">
              {footerData?.copyright ||
                `© ${new Date().getFullYear()} SouthAfricanBet.co.za. All rights reserved. 18+ only. Terms and conditions apply.`}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-2">
                {socialLinks.map(({ id, platform, url }, i) => {
                  const social = SOCIAL_PATHS[platform]
                  if (!social) return null
                  return (
                    <Link
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-primary hover:bg-primary hover:text-white"
                      href={url}
                      key={id ?? i}
                    >
                      <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
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
