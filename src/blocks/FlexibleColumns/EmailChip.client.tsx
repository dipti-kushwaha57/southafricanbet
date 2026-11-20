'use client'

import { ArrowRight, Check, Copy } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export const EmailChip: React.FC<{ email?: string | null; formAnchor?: string | null }> = ({ email, formAnchor }) => {
  const [copied, setCopied] = useState(false)

  if (!email) return null

  const copy = () => {
    navigator.clipboard?.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="flex-columns-email-chip-wrap">
      <div className="flex-columns-email-chip">
        <span className="flex-columns-email-chip-address">{email}</span>
        <button className="flex-columns-email-chip-copy" onClick={copy} type="button">
          {copied ? <Check aria-hidden="true" className="flex-columns-email-chip-copy-icon" /> : <Copy aria-hidden="true" className="flex-columns-email-chip-copy-icon" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {formAnchor && (
        <Link className="flex-columns-email-chip-form-link" href={formAnchor}>
          Or use the form <ArrowRight aria-hidden="true" className="flex-columns-email-chip-form-link-icon" />
        </Link>
      )}
    </div>
  )
}
