import { Check, ShieldCheck } from 'lucide-react'
import React from 'react'

import type { LicensingBlock as LicensingBlockProps } from '@/payload-types'

import { Section } from '@/components/Section'
import styles from './LicensingBlock.module.css'

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
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{authoritiesHeading}</h3>
          <ul className={styles.authorityList}>
            {(authorities || []).map((authority, i) => (
              <li className={styles.authorityItem} key={authority.id ?? i}>
                <ShieldCheck aria-hidden="true" className={styles.authorityIcon} />
                {authority.name}
              </li>
            ))}
          </ul>
          {proTip && (
            <p className={styles.proTip}>
              <b>Pro Tip:</b> {proTip}
            </p>
          )}
        </div>
        <div className={styles.benefitsCard}>
          <h3 className={styles.cardTitle}>{benefitsHeading}</h3>
          <ul className={styles.benefitsList}>
            {(benefits || []).map((benefit, i) => (
              <li className={styles.benefitItem} key={benefit.id ?? i}>
                <Check aria-hidden="true" className={styles.benefitIcon} />
                {benefit.text}
              </li>
            ))}
          </ul>
          {benefitsNote && <p className={styles.benefitsNote}>{benefitsNote}</p>}
        </div>
      </div>
    </Section>
  )
}
