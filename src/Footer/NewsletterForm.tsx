'use client'
import { Mail, Send } from 'lucide-react'
import React from 'react'

/** Newsletter signup UI. Not connected to a mailing service yet (same as the supplied design). */
export const NewsletterForm: React.FC<{
  buttonLabel?: string | null
  eyebrow?: string | null
  heading?: string | null
  text?: string | null
}> = ({ buttonLabel, eyebrow, heading, text }) => (
  <form
    className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-7"
    onSubmit={(event) => {
      event.preventDefault()
      const form = event.currentTarget
      if (form.checkValidity()) {
        alert('Thanks! Connect this form to your newsletter service to save subscriptions.')
        form.reset()
      }
    }}
  >
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
    {heading && <h3 className="mt-2 text-xl font-extrabold text-white md:text-2xl">{heading}</h3>}
    {text && <p className="mt-1 text-sm text-white/55">{text}</p>}
    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-primary"
          placeholder="Your email address"
          required
          type="email"
        />
      </div>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
        type="submit"
      >
        {buttonLabel || 'Subscribe'} <Send aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  </form>
)
