import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

import { SiteLink } from '@/components/Link/SiteLink'
import { SectionEyebrow, SectionHeading, SectionIntro, SectionWrap } from '@/components/Section'
import { FaqAccordion } from './Accordion'

export const FaqBlockComponent: React.FC<FaqBlockProps & { id?: string }> = (props) => {
  const { anchorId, ctaLink, eyebrow, heading, headingHighlight, intro, items, quickLinks, quickLinksHeading, tinted } =
    props

  return (
    <SectionWrap anchorId={anchorId} tinted={tinted}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.4fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <SectionHeading
            className="text-3xl font-extrabold md:text-5xl"
            heading={heading}
            highlight={headingHighlight}
          />
          <SectionIntro className="mt-4 text-muted-foreground md:text-lg">{intro}</SectionIntro>
          {quickLinks && quickLinks.length > 0 && (
            <div className="mt-8 rounded-3xl border bg-card p-6 shadow-card">
              <h3 className="flex items-center gap-2 font-extrabold">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-primary" /> {quickLinksHeading}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {quickLinks.map(({ id, link }, i) => (
                  <SiteLink
                    className="rounded-full border bg-background px-3.5 py-2 text-sm font-semibold transition hover:border-primary hover:bg-accent hover:text-primary"
                    key={id ?? i}
                    link={link}
                  />
                ))}
              </div>
            </div>
          )}
          {ctaLink?.label && (
            <SiteLink
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
              link={ctaLink}
            >
              {ctaLink.label} <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </SiteLink>
          )}
        </div>
        <FaqAccordion items={items.map(({ answer, question }) => ({ answer, question }))} />
      </div>
    </SectionWrap>
  )
}
