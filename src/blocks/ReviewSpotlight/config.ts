import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewSpotlight: Block = {
  slug: 'reviewSpotlight',
  interfaceName: 'ReviewSpotlightBlock',
  labels: { plural: 'Review Spotlights', singular: 'Review Spotlight' },
  fields: [
    ...reviewSectionFields,
    { name: 'tag', type: 'text', admin: { description: 'Small label above the title (e.g. VIP & loyalty).' } },
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
      maxRows: 3,
    },
    { name: 'note', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
