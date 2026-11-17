import { ArrowRight, BadgeCheck } from 'lucide-react'
import React from 'react'

import type { FeatureGridBlock as FeatureGridProps } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { SiteLink } from '@/components/Link/SiteLink'
import { Section } from '@/components/Section'

type Items = FeatureGridProps['items']

const Steps: React.FC<{ callout?: string | null; items: Items }> = ({ callout, items }) => (
  <div className="feature-grid-steps-grid">
    {items.map((item, i) => (
      <div className="feature-grid-step-card" key={item.id ?? i}>
        <span className="feature-grid-step-number">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="feature-grid-step-title">{item.title}</h3>
        {item.description && <p className="feature-grid-step-description">{item.description}</p>}
      </div>
    ))}
    {callout && (
      <div className="feature-grid-step-callout">
        <p className="feature-grid-step-callout-label">Tip</p>
        <p className="feature-grid-step-callout-text">{callout}</p>
      </div>
    )}
  </div>
)

const Criteria: React.FC<{ items: Items }> = ({ items }) => (
  <div className="feature-grid-criteria-grid">
    {items.map((item, i) => (
      <div className="feature-grid-criteria-card" key={item.id ?? i}>
        <span className="feature-grid-criteria-number">{i + 1}</span>
        <h3 className="feature-grid-criteria-title">{item.title}</h3>
        {item.description && <p className="feature-grid-criteria-description">{item.description}</p>}
      </div>
    ))}
  </div>
)

const Sports: React.FC<{ items: Items }> = ({ items }) => (
  <div className="feature-grid-sports-grid">
    {items.map((item, i) => (
      <div className="feature-grid-sports-card" key={item.id ?? i}>
        <div className="feature-grid-sports-head">
          {item.icon && typeof item.icon === 'object' && (
            <CmsImg className="feature-grid-sports-icon" resource={item.icon} />
          )}
          <h3 className="feature-grid-sports-title">{item.title}</h3>
        </div>
        {item.description && <p className="feature-grid-sports-description">{item.description}</p>}
        {item.tip && (
          <p className="feature-grid-sports-tip">
            <b>Pro Tip:</b> {item.tip}
          </p>
        )}
      </div>
    ))}
  </div>
)

const Trust: React.FC<{ block: FeatureGridProps }> = ({ block }) => (
  <>
    <div className="feature-grid-trust-grid">
      {block.items.map((item, i) => (
        <div className="feature-grid-trust-card" key={item.id ?? i}>
          <BadgeCheck aria-hidden="true" className="feature-grid-trust-icon" />
          <h3 className="feature-grid-trust-title">{item.title}</h3>
          {item.description && <p className="feature-grid-trust-description">{item.description}</p>}
        </div>
      ))}
    </div>
    {block.quote && <blockquote className="feature-grid-quote">“{block.quote}”</blockquote>}
    {block.ctaHeading && (
      <div className="feature-grid-cta-banner">
        <div className="feature-grid-cta-banner-grid">
          <div>
            <h2 className="feature-grid-cta-heading">{block.ctaHeading}</h2>
            {block.ctaText && <p className="feature-grid-cta-text">{block.ctaText}</p>}
          </div>
          <SiteLink className="feature-grid-cta-button" link={block.ctaLink}>
            {block.ctaLink?.label} <ArrowRight aria-hidden="true" className="feature-grid-cta-button-icon" />
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
