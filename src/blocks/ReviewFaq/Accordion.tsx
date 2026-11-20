'use client'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'

export const ReviewFaqAccordion: React.FC<{ items: { answer: string; question: string }[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="review-faq">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div className={cn('review-faq-item', open && 'is-open')} key={i}>
            <button
              aria-expanded={open}
              className="review-faq-question"
              onClick={() => setOpenIndex(open ? null : i)}
              type="button"
            >
              <span>{item.question}</span>
              <span className="review-faq-toggle">
                {open ? (
                  <Minus aria-hidden="true" className="review-faq-toggle-icon" />
                ) : (
                  <Plus aria-hidden="true" className="review-faq-toggle-icon" />
                )}
              </span>
            </button>
            <div className="review-faq-answer-wrap">
              <div className="review-faq-answer-clip">
                <p className="review-faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
