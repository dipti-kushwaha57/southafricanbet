import { ArrowRight, BadgeCheck } from 'lucide-react'
import React from 'react'

import type { FeatureGridBlock as FeatureGridProps } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'
import { Section } from '@/components/Section'
import { SiteLink } from '@/components/Link/SiteLink'

type Items = FeatureGridProps['items']

const Steps: React.FC<{ callout?: string | null; items: Items }> = ({ callout, items }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {items.map((item, i) => (
      <div className="rounded-3xl border bg-card p-4 shadow-card sm:p-6" key={item.id ?? i}>
        <span className="font-display text-3xl font-extrabold text-gradient sm:text-5xl">
          {String(i + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-1.5 text-lg font-bold sm:mt-3">{item.title}</h3>
        {item.description && <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>}
      </div>
    ))}
    {callout && (
      <div className="flex flex-col justify-between rounded-3xl bg-gradient-primary p-4 text-primary-foreground shadow-glow sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider">Tip</p>
        <p className="font-display text-base font-bold leading-snug sm:text-xl sm:leading-normal">{callout}</p>
      </div>
    )}
  </div>
)

const Criteria: React.FC<{ items: Items }> = ({ items }) => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
    {items.map((item, i) => (
      <div className="rounded-2xl border bg-card p-4 transition hover:border-primary sm:p-5" key={item.id ?? i}>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
          {i + 1}
        </span>
        <h3 className="mt-1.5 font-bold sm:mt-3">{item.title}</h3>
        {item.description && <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>}
      </div>
    ))}
  </div>
)

const Sports: React.FC<{ items: Items }> = ({ items }) => (
  <div className="grid gap-5 md:grid-cols-2">
    {items.map((item, i) => (
      <div className="rounded-3xl border bg-card p-4 shadow-card sm:p-7" key={item.id ?? i}>
        <div className="flex items-center gap-3">
          {item.icon && typeof item.icon === 'object' && (
            <CmsImg className="h-9 w-9 object-contain" resource={item.icon} />
          )}
          <h3 className="text-2xl font-extrabold">{item.title}</h3>
        </div>
        {item.description && <p className="mt-2 text-muted-foreground sm:mt-4">{item.description}</p>}
        {item.tip && (
          <p className="mt-2 rounded-xl bg-accent p-3 text-sm text-accent-foreground sm:mt-4">
            <b>Pro Tip:</b> {item.tip}
          </p>
        )}
      </div>
    ))}
  </div>
)

const Trust: React.FC<{ block: FeatureGridProps }> = ({ block }) => (
  <>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {block.items.map((item, i) => (
        <div className="trust-card rounded-2xl border bg-card p-4 sm:p-5" key={item.id ?? i}>
          <BadgeCheck aria-hidden="true" className="h-6 w-6 text-primary" />
          <h3 className="mt-1.5 font-bold sm:mt-3">{item.title}</h3>
          {item.description && <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>}
        </div>
      ))}
    </div>
    {block.quote && (
      <blockquote className="mt-10 rounded-3xl border bg-card p-8 text-center font-display text-xl font-bold md:text-2xl">
        “{block.quote}”
      </blockquote>
    )}
    {block.ctaHeading && (
      <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-glow md:p-12">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl">{block.ctaHeading}</h2>
            {block.ctaText && <p className="mt-3 max-w-2xl opacity-90">{block.ctaText}</p>}
          </div>
          <SiteLink
            className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 font-bold text-foreground transition hover:-translate-y-0.5"
            link={block.ctaLink}
          >
            {block.ctaLink?.label} <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
