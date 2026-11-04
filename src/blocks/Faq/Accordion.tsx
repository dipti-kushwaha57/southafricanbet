'use client'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'

export const FaqAccordion: React.FC<{ items: { answer: string; question: string }[] }> = ({ items }) => {
  // Only one answer is open at a time; clicking the open one closes it.
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (index: number) => setOpen((current) => (current === index ? null : index))

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            className={cn(
              'rounded-2xl border bg-card transition',
              isOpen ? 'border-primary shadow-card ring-1 ring-primary/20' : 'hover:border-primary/50',
            )}
            key={i}
          >
            <button
              aria-controls={`faq-answer-${i}`}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-4 text-left sm:p-5 faq-toggle"
              onClick={() => toggle(i)}
              type="button"
            >
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold transition',
                  isOpen ? 'bg-gradient-primary text-primary-foreground' : 'bg-accent text-accent-foreground',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-bold">{item.question}</span>
              <span
                className={cn(
                  'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition',
                  isOpen ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground',
                )}
              >
                {isOpen ? (
                  <Minus aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Plus aria-hidden="true" className="h-4 w-4" />
                )}
              </span>
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 faq-answer',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] is-collapsed',
              )}
              id={`faq-answer-${i}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-muted-foreground sm:pl-[4.75rem] sm:pr-6">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
