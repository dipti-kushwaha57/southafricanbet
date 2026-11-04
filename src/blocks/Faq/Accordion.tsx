'use client'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'
import styles from './Accordion.module.css'

export const FaqAccordion: React.FC<{ items: { answer: string; question: string }[] }> = ({ items }) => {
  // Only one answer is open at a time; clicking the open one closes it.
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (index: number) => setOpen((current) => (current === index ? null : index))

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div className={cn(styles.item, isOpen && styles.itemOpen)} key={i}>
            <button
              aria-controls={`faq-answer-${i}`}
              aria-expanded={isOpen}
              className={styles.toggle}
              onClick={() => toggle(i)}
              type="button"
            >
              <span className={cn(styles.number, isOpen && styles.numberOpen)}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.question}>{item.question}</span>
              <span className={cn(styles.marker, isOpen && styles.markerOpen)}>
                {isOpen ? (
                  <Minus aria-hidden="true" className={styles.markerIcon} />
                ) : (
                  <Plus aria-hidden="true" className={styles.markerIcon} />
                )}
              </span>
            </button>
            <div
              className={cn(styles.answerRow, !isOpen && styles.answerRowCollapsed)}
              id={`faq-answer-${i}`}
            >
              <div className={styles.answerClip}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
