import { Globe, LifeBuoy, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { LegalSectionsBlock as Props } from '@/payload-types'

import { ReviewIcon } from '@/components/review/ReviewIcon'

export const LegalSectionsComponent: React.FC<Props & { id?: string }> = ({ sections }) => (
  <section className="section-wrap">
    <div className="section-container">
      <div className="legal-sections">
        {(sections || []).map((section, i) => (
          <div className="legal-section-card" key={section.id ?? i}>
            <span className="legal-section-icon">
              <ReviewIcon className="legal-section-icon-svg" name={section.icon} />
            </span>
            <div className="legal-section-body">
              <p className="legal-section-eyebrow">Section {i + 1}</p>
              <h2 className="legal-section-heading">{section.heading}</h2>

              {section.points && section.points.length > 0 ? (
                <div className="legal-section-points">
                  {section.points.map((point, j) => (
                    <div className="legal-section-point" key={point.id ?? j}>
                      <span className="legal-section-point-dot" />
                      <span>{point.text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                section.text && <p className="legal-section-text">{section.text}</p>
              )}

              {section.helpline?.value && (
                <div className="legal-helpline-card">
                  <div className="legal-helpline-card-main">
                    <LifeBuoy aria-hidden="true" className="legal-helpline-card-icon" />
                    <div>
                      {section.helpline.title && <p className="legal-helpline-card-title">{section.helpline.title}</p>}
                      {section.helpline.subtitle && (
                        <p className="legal-helpline-card-subtitle">{section.helpline.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="legal-helpline-card-value">{section.helpline.value}</p>
                    {section.helpline.linkLabel && section.helpline.linkUrl && (
                      <Link className="legal-helpline-card-link" href={section.helpline.linkUrl}>
                        {section.helpline.linkLabel}
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {(section.contact?.email || section.contact?.website) && (
                <div className="legal-contact-row">
                  {section.contact.email && (
                    <div className="legal-contact-chip">
                      <Mail aria-hidden="true" className="legal-contact-chip-icon" />
                      <div>
                        <p className="legal-contact-chip-label">Email</p>
                        <p className="legal-contact-chip-value">{section.contact.email}</p>
                      </div>
                    </div>
                  )}
                  {section.contact.website && (
                    <div className="legal-contact-chip">
                      <Globe aria-hidden="true" className="legal-contact-chip-icon" />
                      <div>
                        <p className="legal-contact-chip-label">Website</p>
                        <p className="legal-contact-chip-value">{section.contact.website}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
