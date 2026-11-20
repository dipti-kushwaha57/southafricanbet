import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewProsCons: Block = {
  slug: 'reviewProsCons',
  interfaceName: 'ReviewProsConsBlock',
  labels: { plural: 'Review Pros & Cons', singular: 'Review Pros & Cons' },
  fields: [
    ...reviewSectionFields,
    { name: 'prosTitle', type: 'text', defaultValue: 'Pros' },
    { name: 'pros', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'consTitle', type: 'text', defaultValue: 'Cons' },
    { name: 'cons', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
  ],
}
