import type { Field } from 'payload'

/**
 * Fields shared by every homepage "section" block (eyebrow label, heading with an
 * optional gradient tail, intro copy, in-page anchor and tinted background).
 * Rendered by `@/components/Section`.
 */
export const sectionFields: Field[] = [
  {
    name: 'anchorId',
    type: 'text',
    admin: {
      description: 'In-page anchor used by menu links, e.g. "top" for /#top.',
    },
    label: 'Anchor ID',
  },
  {
    name: 'tinted',
    type: 'checkbox',
    admin: {
      description: 'Warm gradient background with top/bottom borders (the "How to bet" look).',
    },
    label: 'Tinted background',
  },
  {
    name: 'eyebrow',
    type: 'text',
    label: 'Eyebrow (small label above heading)',
  },
  {
    type: 'row',
    fields: [
      {
        name: 'heading',
        type: 'text',
        admin: { width: '60%' },
      },
      {
        name: 'headingHighlight',
        type: 'text',
        admin: {
          description: 'Optional: the end of the heading shown in the red gradient.',
          width: '40%',
        },
        label: 'Gradient part of heading',
      },
    ],
  },
  {
    name: 'intro',
    type: 'textarea',
    label: 'Intro text',
  },
]
