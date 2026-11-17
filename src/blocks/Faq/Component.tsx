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
      <div className="faq-layout">
        <div className="faq-intro">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <SectionHeading className="section-heading" heading={heading} highlight={headingHighlight} />
          <SectionIntro className="section-intro">{intro}</SectionIntro>
          {quickLinks && quickLinks.length > 0 && (
            <div className="faq-quick-links-box">
              <h3 className="faq-quick-links-heading">
                <Sparkles aria-hidden="true" className="faq-quick-links-icon" /> {quickLinksHeading}
              </h3>
              <div className="faq-quick-links-list">
                {quickLinks.map(({ id, link }, i) => (
                  <SiteLink className="faq-quick-link" key={id ?? i} link={link} />
                ))}
              </div>
            </div>
          )}
          {ctaLink?.label && (
            <SiteLink className="faq-cta-button" link={ctaLink}>
              {ctaLink.label} <ArrowRight aria-hidden="true" className="faq-cta-button-icon" />
            </SiteLink>
          )}
        </div>
        <FaqAccordion items={items.map(({ answer, question }) => ({ answer, question }))} />
      </div>
    </SectionWrap>
  )
}
