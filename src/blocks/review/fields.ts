import type { Field } from 'payload'

import { sectionFields } from '@/fields/sectionFields'

import { REVIEW_ICON_OPTIONS } from './icons'

export const reviewIconField = (overrides: Partial<Field> = {}): Field =>
  ({
    name: 'icon',
    type: 'select',
    options: REVIEW_ICON_OPTIONS,
    ...overrides,
  }) as Field

/** Section fields + the label shown in the review page's sticky "On this page" bar. */
export const reviewSectionFields: Field[] = [
  reviewIconField({
    name: 'eyebrowIcon',
    admin: { description: 'Icon shown beside the small label above the heading.' },
    label: 'Label icon',
  }),
  {
    name: 'attachToPrevious',
    type: 'checkbox',
    admin: {
      description: 'Shows this block right under the one above it with a small gap (use it to continue a section).',
    },
    defaultValue: false,
    label: 'Group with previous section',
  },
  {
    name: 'tocLabel',
    type: 'text',
    admin: {
      description: 'Short name in the sticky "On this page" bar. Leave empty to hide this section from it.',
    },
    label: 'Table-of-contents label',
  },
  ...sectionFields,
]

export const columnsField = (defaultValue = '2'): Field => ({
  name: 'columns',
  type: 'select',
  admin: { description: 'Columns on desktop. Phones always show one column.' },
  defaultValue,
  options: [
    { label: '1 column', value: '1' },
    { label: '2 columns', value: '2' },
    { label: '3 columns', value: '3' },
    { label: '4 columns', value: '4' },
  ],
})
