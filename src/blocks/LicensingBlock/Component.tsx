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
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-card p-7 shadow-card">
          <h3 className="text-xl font-extrabold">{authoritiesHeading}</h3>
          <ul className="mt-5 space-y-3">
            {(authorities || []).map((authority, i) => (
              <li
                className="flex items-center gap-3 rounded-xl bg-muted p-3 text-sm font-semibold"
                key={authority.id ?? i}
              >
                <ShieldCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
                {authority.name}
              </li>
            ))}
          </ul>
          {proTip && (
            <p className="mt-5 rounded-xl border-l-4 border-primary bg-accent p-4 text-sm">
              <b>Pro Tip:</b> {proTip}
            </p>
          )}
        </div>
        <div className="rounded-3xl bg-gradient-primary p-7 text-primary-foreground shadow-glow">
          <h3 className="text-xl font-extrabold">{benefitsHeading}</h3>
          <ul className="mt-5 space-y-4">
            {(benefits || []).map((benefit, i) => (
              <li className="flex gap-3" key={benefit.id ?? i}>
                <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                {benefit.text}
              </li>
            ))}
          </ul>
          {benefitsNote && <p className="mt-6 text-sm opacity-90">{benefitsNote}</p>}
        </div>
      </div>
    </Section>
  )
}
