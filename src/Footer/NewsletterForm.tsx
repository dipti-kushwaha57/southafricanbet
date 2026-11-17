'use client'
import { Check, Mail, Send, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

/** Newsletter signup UI. Not connected to a mailing service yet (same as the supplied design). */
export const NewsletterForm: React.FC<{
  buttonLabel?: string | null
  eyebrow?: string | null
  heading?: string | null
  text?: string | null
}> = ({ buttonLabel, eyebrow, heading, text }) => {
  const [toastOpen, setToastOpen] = useState(false)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(dismissTimer.current), [])

  const showToast = () => {
    setToastOpen(true)
    clearTimeout(dismissTimer.current)
    dismissTimer.current = setTimeout(() => setToastOpen(false), 5000)
  }

  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity()) {
          showToast()
          form.reset()
        }
      }}
    >
      {eyebrow && <p className="newsletter-form-eyebrow">{eyebrow}</p>}
      {heading && <h3 className="newsletter-form-heading">{heading}</h3>}
      {text && <p className="newsletter-form-text">{text}</p>}
      <div className="newsletter-form-row">
        <div className="newsletter-form-field-wrap">
          <Mail aria-hidden="true" className="newsletter-form-field-icon" />
          <input className="newsletter-form-field" placeholder="Your email address" required type="email" />
        </div>
        <button className="newsletter-form-submit-button" type="submit">
          {buttonLabel || 'Subscribe'} <Send aria-hidden="true" className="newsletter-form-submit-icon" />
        </button>
      </div>

      <div aria-live="polite" className="newsletter-toast-region" role="status">
        {toastOpen && (
          <div className="newsletter-toast">
            <Check aria-hidden="true" className="newsletter-toast-icon" />
            <p className="newsletter-toast-text">
              Thanks for subscribing! Watch your inbox for the latest offers.
            </p>
            <button
              aria-label="Dismiss"
              className="newsletter-toast-close"
              onClick={() => setToastOpen(false)}
              type="button"
            >
              <X aria-hidden="true" className="newsletter-toast-close-icon" />
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
