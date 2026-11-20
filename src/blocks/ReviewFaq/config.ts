import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewFaq: Block = {
  slug: 'reviewFaq',
  interfaceName: 'ReviewFaqBlock',
  labels: { plural: 'Review FAQs', singular: 'Review FAQ' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
      minRows: 1,
    },
  ],
}
