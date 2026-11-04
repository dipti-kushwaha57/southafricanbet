import React from 'react'

/** Splits `heading` into [lead, gradientTail] when it ends with `highlight`. */
const splitHighlight = (heading: string, highlight?: string | null): [string, string] => {
  if (highlight && heading.endsWith(highlight)) {
    return [heading.slice(0, heading.length - highlight.length), highlight]
  }
  return [heading, '']
}

export const SectionEyebrow: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  children ? (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">{children}</p>
  ) : null

export const SectionHeading: React.FC<{
  className?: string
  heading?: string | null
  highlight?: string | null
}> = ({ className = 'max-w-3xl text-3xl font-extrabold md:text-5xl', heading, highlight }) => {
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
  className = 'mt-4 max-w-3xl text-muted-foreground md:text-lg',
}) => (children ? <p className={className}>{children}</p> : null)

/** <section> shell; `tinted` adds the warm gradient band with top/bottom borders. */
export const SectionWrap: React.FC<{
  anchorId?: string | null
  children: React.ReactNode
  tinted?: boolean | null
}> = ({ anchorId, children, tinted }) => {
  const section = (
    <section className="scroll-mt-24 py-10 sm:py-16 md:py-24" id={anchorId || undefined}>
      {children}
    </section>
  )

  return tinted ? <div className="bg-howto border-y">{section}</div> : section
}

/** Standard section: eyebrow, heading, intro, then `children` in a `mt-10` area. */
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <SectionHeading heading={heading} highlight={headingHighlight} />
      <SectionIntro>{intro}</SectionIntro>
      {children && <div className="mt-6 sm:mt-10">{children}</div>}
    </div>
  </SectionWrap>
)
