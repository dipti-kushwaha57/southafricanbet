import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewVerdict: Block = {
  slug: 'reviewVerdict',
  interfaceName: 'ReviewVerdictBlock',
  labels: { plural: 'Review Verdicts', singular: 'Review Verdict' },
  fields: [
    ...reviewSectionFields,
    { name: 'body', type: 'textarea' },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: { description: 'Leave empty for "Claim <bonus headline>". The link is the review\'s Play Now link.' },
      label: 'Button label',
    },
    { name: 'secondaryLabel', type: 'text', admin: { description: 'e.g. See payment methods' } },
    { name: 'secondaryHref', type: 'text', admin: { description: 'e.g. #payments' } },
  ],
}
