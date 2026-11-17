'use client'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'

export const FaqAccordion: React.FC<{ items: { answer: string; question: string }[] }> = ({ items }) => {
  // Only one answer is open at a time; clicking the open one closes it.
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (index: number) => setOpen((current) => (current === index ? null : index))

  return (
    <div className="faq-accordion-list">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div className={cn('faq-accordion-item', isOpen && 'faq-accordion-item-open')} key={i}>
            <button
              aria-controls={`faq-answer-${i}`}
              aria-expanded={isOpen}
              className="faq-accordion-toggle"
              onClick={() => toggle(i)}
              type="button"
            >
              <span className={cn('faq-accordion-number', isOpen && 'faq-accordion-number-open')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="faq-accordion-question">{item.question}</span>
              <span className={cn('faq-accordion-marker', isOpen && 'faq-accordion-marker-open')}>
                {isOpen ? (
                  <Minus aria-hidden="true" className="faq-accordion-marker-icon" />
                ) : (
                  <Plus aria-hidden="true" className="faq-accordion-marker-icon" />
                )}
              </span>
            </button>
            <div
              className={cn('faq-accordion-answer-row', !isOpen && 'faq-accordion-answer-row-collapsed')}
              id={`faq-answer-${i}`}
            >
              <div className="faq-accordion-answer-clip">
                <p className="faq-accordion-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
