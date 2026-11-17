import React from 'react'

import { cn } from '@/utilities/ui'

/** Splits `heading` into [lead, gradientTail] when it ends with `highlight`. */
const splitHighlight = (heading: string, highlight?: string | null): [string, string] => {
  if (highlight && heading.endsWith(highlight)) {
    return [heading.slice(0, heading.length - highlight.length), highlight]
  }
  return [heading, '']
}

export const SectionEyebrow: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  children ? <p className="section-eyebrow">{children}</p> : null

export const SectionHeading: React.FC<{
  className?: string
  heading?: string | null
  highlight?: string | null
}> = ({ className = 'section-heading section-heading-constrained', heading, highlight }) => {
  if (!heading) return null
  const [lead, tail] = splitHighlight(heading, highlight)

  return (
    <h2 className={className}>
      {lead}
      {tail && <span className="text-gradient">{tail}</span>}
    </h2>
  )
}

export const SectionIntro: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = 'section-intro section-intro-constrained',
}) => (children ? <p className={className}>{children}</p> : null)

/** <section> shell; `tinted` adds the warm gradient band with top/bottom borders. */
export const SectionWrap: React.FC<{
  anchorId?: string | null
  children: React.ReactNode
  tinted?: boolean | null
}> = ({ anchorId, children, tinted }) => {
  const section = (
    <section className="section-wrap" id={anchorId || undefined}>
      {children}
    </section>
  )

  return tinted ? <div className={cn('bg-howto', 'section-tinted')}>{section}</div> : section
}

/** Standard section: eyebrow, heading, intro, then `children` below. */
export const Section: React.FC<{
  anchorId?: string | null
  children?: React.ReactNode
  eyebrow?: string | null
  heading?: string | null
  headingHighlight?: string | null
  intro?: string | null
  tinted?: boolean | null
}> = ({ anchorId, children, eyebrow, heading, headingHighlight, intro, tinted }) => (
  <SectionWrap anchorId={anchorId} tinted={tinted}>
    <div className="section-container">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <SectionHeading heading={heading} highlight={headingHighlight} />
      <SectionIntro>{intro}</SectionIntro>
      {children && <div className="section-content">{children}</div>}
    </div>
  </SectionWrap>
)
