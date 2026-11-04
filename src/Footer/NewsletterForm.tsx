'use client'
import { Mail, Send } from 'lucide-react'
import React from 'react'

import styles from './NewsletterForm.module.css'

/** Newsletter signup UI. Not connected to a mailing service yet (same as the supplied design). */
export const NewsletterForm: React.FC<{
  buttonLabel?: string | null
  eyebrow?: string | null
  heading?: string | null
  text?: string | null
}> = ({ buttonLabel, eyebrow, heading, text }) => (
  <form
    className={styles.form}
    onSubmit={(event) => {
      event.preventDefault()
      const form = event.currentTarget
      if (form.checkValidity()) {
        alert('Thanks! Connect this form to your newsletter service to save subscriptions.')
        form.reset()
      }
    }}
  >
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    {heading && <h3 className={styles.heading}>{heading}</h3>}
    {text && <p className={styles.text}>{text}</p>}
    <div className={styles.row}>
      <div className={styles.fieldWrap}>
        <Mail aria-hidden="true" className={styles.fieldIcon} />
        <input className={styles.field} placeholder="Your email address" required type="email" />
      </div>
      <button className={styles.submitButton} type="submit">
        {buttonLabel || 'Subscribe'} <Send aria-hidden="true" className={styles.submitIcon} />
      </button>
    </div>
  </form>
)
