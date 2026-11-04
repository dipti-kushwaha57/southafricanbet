import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

import { SiteLink } from '@/components/Link/SiteLink'
import { SectionEyebrow, SectionHeading, SectionIntro, SectionWrap, sectionStyles } from '@/components/Section'
import { FaqAccordion } from './Accordion'
import styles from './Faq.module.css'

export const FaqBlockComponent: React.FC<FaqBlockProps & { id?: string }> = (props) => {
  const { anchorId, ctaLink, eyebrow, heading, headingHighlight, intro, items, quickLinks, quickLinksHeading, tinted } =
    props

  return (
    <SectionWrap anchorId={anchorId} tinted={tinted}>
      <div className={styles.layout}>
        <div className={styles.intro}>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <SectionHeading className={sectionStyles.headingBase} heading={heading} highlight={headingHighlight} />
          <SectionIntro className={sectionStyles.introBase}>{intro}</SectionIntro>
          {quickLinks && quickLinks.length > 0 && (
            <div className={styles.quickLinksBox}>
              <h3 className={styles.quickLinksHeading}>
                <Sparkles aria-hidden="true" className={styles.quickLinksIcon} /> {quickLinksHeading}
              </h3>
              <div className={styles.quickLinksList}>
                {quickLinks.map(({ id, link }, i) => (
                  <SiteLink className={styles.quickLink} key={id ?? i} link={link} />
                ))}
              </div>
            </div>
          )}
          {ctaLink?.label && (
            <SiteLink className={styles.ctaButton} link={ctaLink}>
              {ctaLink.label} <ArrowRight aria-hidden="true" className={styles.ctaButtonIcon} />
            </SiteLink>
          )}
        </div>
        <FaqAccordion items={items.map(({ answer, question }) => ({ answer, question }))} />
      </div>
    </SectionWrap>
  )
}
