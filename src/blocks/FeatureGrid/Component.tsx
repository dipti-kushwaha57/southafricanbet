import { ArrowRight, BadgeCheck } from 'lucide-react'
import React from 'react'

import type { FeatureGridBlock as FeatureGridProps } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { Section } from '@/components/Section'
import { cn } from '@/utilities/ui'
import styles from './FeatureGrid.module.css'

type Items = FeatureGridProps['items']

const Steps: React.FC<{ callout?: string | null; items: Items }> = ({ callout, items }) => (
  <div className={styles.stepsGrid}>
    {items.map((item, i) => (
      <div className={styles.stepCard} key={item.id ?? i}>
        <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
        <h3 className={styles.stepTitle}>{item.title}</h3>
        {item.description && <p className={styles.stepDescription}>{item.description}</p>}
      </div>
    ))}
    {callout && (
      <div className={styles.stepCallout}>
        <p className={styles.stepCalloutLabel}>Tip</p>
        <p className={styles.stepCalloutText}>{callout}</p>
      </div>
    )}
  </div>
)

const Criteria: React.FC<{ items: Items }> = ({ items }) => (
  <div className={styles.criteriaGrid}>
    {items.map((item, i) => (
      <div className={styles.criteriaCard} key={item.id ?? i}>
        <span className={styles.criteriaNumber}>{i + 1}</span>
        <h3 className={styles.criteriaTitle}>{item.title}</h3>
        {item.description && <p className={styles.criteriaDescription}>{item.description}</p>}
      </div>
    ))}
  </div>
)

const Sports: React.FC<{ items: Items }> = ({ items }) => (
  <div className={styles.sportsGrid}>
    {items.map((item, i) => (
      <div className={styles.sportsCard} key={item.id ?? i}>
        <div className={styles.sportsHead}>
          {item.icon && typeof item.icon === 'object' && (
            <CmsImg className={styles.sportsIcon} resource={item.icon} />
          )}
          <h3 className={styles.sportsTitle}>{item.title}</h3>
        </div>
        {item.description && <p className={styles.sportsDescription}>{item.description}</p>}
        {item.tip && (
          <p className={styles.sportsTip}>
            <b>Pro Tip:</b> {item.tip}
          </p>
        )}
      </div>
    ))}
  </div>
)

const Trust: React.FC<{ block: FeatureGridProps }> = ({ block }) => (
  <>
    <div className={styles.trustGrid}>
      {block.items.map((item, i) => (
        <div className={cn('trust-card', styles.trustCard)} key={item.id ?? i}>
          <BadgeCheck aria-hidden="true" className={styles.trustIcon} />
          <h3 className={styles.trustTitle}>{item.title}</h3>
          {item.description && <p className={styles.trustDescription}>{item.description}</p>}
        </div>
      ))}
    </div>
    {block.quote && <blockquote className={styles.quote}>“{block.quote}”</blockquote>}
    {block.ctaHeading && (
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerGrid}>
          <div>
            <h2 className={styles.ctaHeading}>{block.ctaHeading}</h2>
            {block.ctaText && <p className={styles.ctaText}>{block.ctaText}</p>}
          </div>
          <SiteLink className={styles.ctaButton} link={block.ctaLink}>
            {block.ctaLink?.label} <ArrowRight aria-hidden="true" className={styles.ctaButtonIcon} />
          </SiteLink>
        </div>
      </div>
    )}
  </>
)

export const FeatureGridBlock: React.FC<FeatureGridProps & { id?: string }> = (props) => {
  const { anchorId, callout, eyebrow, heading, headingHighlight, intro, items, tinted, variant } = props

  return (
    <Section
      anchorId={anchorId}
      eyebrow={eyebrow}
      heading={heading}
      headingHighlight={headingHighlight}
      intro={intro}
      tinted={tinted}
    >
      {variant === 'criteria' ? (
        <Criteria items={items} />
      ) : variant === 'sports' ? (
        <Sports items={items} />
      ) : variant === 'trust' ? (
        <Trust block={props} />
      ) : (
        <Steps callout={callout} items={items} />
      )}
    </Section>
  )
}
