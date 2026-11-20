import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionFields } from '@/fields/sectionFields'
import { REVIEW_ICON_OPTIONS } from '../review/icons'

const COLUMN_WIDTH_OPTIONS = [
  { label: 'Full width (1/1)', value: 'full' },
  { label: 'Half (1/2)', value: 'half' },
  { label: 'One third (1/3)', value: 'third' },
  { label: 'Two thirds (2/3)', value: 'twoThirds' },
  { label: 'One quarter (1/4)', value: 'quarter' },
]

const ITEM_TYPE_OPTIONS = [
  { label: 'Section heading (eyebrow + big heading, for a column-level header)', value: 'sectionHeading' },
  { label: 'Title', value: 'title' },
  { label: 'Text', value: 'text' },
  { label: 'Image', value: 'image' },
  { label: 'Button', value: 'button' },
  { label: 'Quick Fact (stat)', value: 'quickFact' },
  { label: 'Accordion (FAQ)', value: 'accordion' },
  { label: 'Email chip (copy + "use the form" link)', value: 'emailChip' },
  { label: 'Checklist item (icon + label + checkmark)', value: 'checklistItem' },
  { label: 'Help card (icon + title + text + big stat, success style)', value: 'helpCard' },
  { label: 'Social links row (from the Footer global)', value: 'socialRow' },
]

export const FlexibleColumns: Block = {
  slug: 'flexCols',
  interfaceName: 'FlexibleColumnsBlock',
  labels: {
    plural: 'Flexible Column Blocks',
    singular: 'Flexible Columns',
  },
  fields: [
    ...sectionFields,
    {
      name: 'cols',
      type: 'array',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'full',
          options: COLUMN_WIDTH_OPTIONS,
          required: true,
        },
        {
          name: 'noCard',
          type: 'checkbox',
          admin: { description: 'Force plain (non-card) styling even on a half/third/quarter column.' },
          label: 'Plain (no card background)',
        },
        {
          name: 'tintCard',
          type: 'checkbox',
          admin: { description: 'Tint the card with a soft success-green background and border (e.g. for responsible-gambling content).' },
          label: 'Success-tinted card',
        },
        {
          name: 'gradientCard',
          type: 'checkbox',
          admin: { description: 'Give the card a soft pink-to-gold gradient background (e.g. for a "what we check" checklist card).' },
          label: 'Gradient card',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'radio',
              admin: { layout: 'horizontal' },
              defaultValue: 'text',
              options: ITEM_TYPE_OPTIONS,
              required: true,
            },
            {
              name: 'eyebrowText',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'sectionHeading',
                description: 'Small label above the heading, e.g. "Who we are".',
              },
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                condition: (_, siblingData) =>
                  ['title', 'checklistItem', 'helpCard', 'sectionHeading'].includes(siblingData?.type),
                description: 'For "Section heading", this is the big heading text.',
              },
            },
            {
              name: 'icon',
              type: 'select',
              admin: {
                condition: (_, siblingData) => ['title', 'checklistItem', 'helpCard'].includes(siblingData?.type),
                description: 'Optional: shows a colored icon circle above the title instead of the inline checkmark.',
              },
              options: REVIEW_ICON_OPTIONS,
            },
            {
              name: 'inlineIcon',
              type: 'checkbox',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'title' && Boolean(siblingData?.icon),
                description: 'Show the icon small and inline before the title (e.g. a card header), instead of as a circle above it.',
              },
              label: 'Show icon inline (small header style)',
            },
            {
              name: 'text',
              type: 'textarea',
              admin: { condition: (_, siblingData) => ['text', 'helpCard'].includes(siblingData?.type) },
            },
            {
              name: 'image',
              type: 'upload',
              admin: { condition: (_, siblingData) => siblingData?.type === 'image' },
              relationTo: 'media',
            },
            link({
              appearances: false,
              overrides: {
                admin: { condition: (_, siblingData) => siblingData?.type === 'button' },
                name: 'btn',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...({ dbName: 'flex_col_btn' } as any),
              },
            }),
            {
              name: 'statValue',
              type: 'text',
              admin: {
                condition: (_, siblingData) => ['quickFact', 'helpCard'].includes(siblingData?.type),
                width: '50%',
              },
              label: 'Value (e.g. 10+)',
            },
            {
              name: 'statLabel',
              type: 'text',
              admin: {
                condition: (_, siblingData) => ['quickFact', 'helpCard'].includes(siblingData?.type),
                width: '50%',
              },
              label: 'Label (e.g. Years in business)',
            },
            {
              name: 'email',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.type === 'emailChip' },
              label: 'Email address',
            },
            {
              name: 'formAnchor',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'emailChip',
                description: 'In-page anchor for the "Or use the form" link, e.g. "#form".',
              },
              defaultValue: '#form',
              label: 'Form link target',
            },
            {
              name: 'accordionItems',
              type: 'array',
              admin: { condition: (_, siblingData) => siblingData?.type === 'accordion' },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
              label: 'Accordion items',
              minRows: 1,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...({ dbName: 'flex_col_accordion' } as any),
            },
          ],
          label: 'Items',
          minRows: 1,
        },
      ],
      label: 'Columns',
      minRows: 1,
    },
  ],
}
