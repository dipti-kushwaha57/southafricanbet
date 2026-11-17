import { Check, ShieldCheck } from 'lucide-react'
import React from 'react'

import type { LicensingBlock as LicensingBlockProps } from '@/payload-types'

import { Section } from '@/components/Section'

export const LicensingBlockComponent: React.FC<LicensingBlockProps & { id?: string }> = (props) => {
  const {
    anchorId,
    authorities,
    authoritiesHeading,
    benefits,
    benefitsHeading,
    benefitsNote,
    eyebrow,
    heading,
    headingHighlight,
    intro,
    proTip,
    tinted,
  } = props

  return (
    <Section
      anchorId={anchorId}
      eyebrow={eyebrow}
      heading={heading}
      headingHighlight={headingHighlight}
      intro={intro}
      tinted={tinted}
    >
      <div className="licensing-grid">
        <div className="licensing-card">
          <h3 className="licensing-card-title">{authoritiesHeading}</h3>
          <ul className="licensing-authority-list">
            {(authorities || []).map((authority, i) => (
              <li className="licensing-authority-item" key={authority.id ?? i}>
                <ShieldCheck aria-hidden="true" className="licensing-authority-icon" />
                {authority.name}
              </li>
            ))}
          </ul>
          {proTip && (
            <p className="licensing-pro-tip">
              <b>Pro Tip:</b> {proTip}
            </p>
          )}
        </div>
        <div className="licensing-benefits-card">
          <h3 className="licensing-card-title">{benefitsHeading}</h3>
          <ul className="licensing-benefits-list">
            {(benefits || []).map((benefit, i) => (
              <li className="licensing-benefit-item" key={benefit.id ?? i}>
                <Check aria-hidden="true" className="licensing-benefit-icon" />
                {benefit.text}
              </li>
            ))}
          </ul>
          {benefitsNote && <p className="licensing-benefits-note">{benefitsNote}</p>}
        </div>
      </div>
    </Section>
  )
}
