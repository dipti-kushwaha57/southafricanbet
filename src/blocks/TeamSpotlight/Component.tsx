import { ArrowRight, Quote } from 'lucide-react'
import React from 'react'

import type { TeamSpotlightBlock as Props } from '@/payload-types'

import { SiteLink } from '@/components/Link/SiteLink'
import { Section } from '@/components/Section'

export const TeamSpotlightComponent: React.FC<Props & { id?: string }> = (props) => {
  const {
    anchorId,
    authorLink,
    bioBold,
    bioLead,
    bioRest,
    eyebrow,
    heading,
    headingHighlight,
    initials,
    intro,
    name,
    role,
    tags,
    tinted,
    verifiedLabel,
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
      <div className="team-spotlight">
        <div className="team-spotlight-avatar-panel">
          <span className="team-spotlight-avatar">{initials}</span>
          {name && <p className="team-spotlight-name">{name}</p>}
          {role && <p className="team-spotlight-role">{role}</p>}
          {verifiedLabel && <span className="team-spotlight-verified">{verifiedLabel}</span>}
        </div>
        <div className="team-spotlight-body">
          <Quote aria-hidden="true" className="team-spotlight-quote-icon" />
          <p className="team-spotlight-bio">
            {bioLead && <>{bioLead} </>}
            {bioBold && <b>{bioBold}</b>} {bioRest}
          </p>
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="team-spotlight-tags">
              {tags.map(({ id, label }, i) => (
                <span className="team-spotlight-tag" key={id ?? i}>
                  {label}
                </span>
              ))}
            </div>
          )}
          {authorLink?.label && (
            <SiteLink className="team-spotlight-link" link={authorLink}>
              {authorLink.label} <ArrowRight aria-hidden="true" className="team-spotlight-link-icon" />
            </SiteLink>
          )}
        </div>
      </div>
    </Section>
  )
}
