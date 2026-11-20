import type { Block } from 'payload'

import { columnsField, reviewSectionFields } from '../review/fields'

export const ReviewShowcase: Block = {
  slug: 'reviewShowcase',
  interfaceName: 'ReviewShowcaseBlock',
  labels: { plural: 'Review Showcases', singular: 'Review Showcase' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'chips',
      type: 'array',
      admin: { description: 'Pill tags (sports list, casino categories...).' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional screenshot under the tags.' } },
    { name: 'caption', type: 'text' },
    columnsField('3'),
    {
      name: 'lists',
      type: 'array',
      admin: { description: 'Bulleted lists shown as cards under the screenshot.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
      ],
    },
  ],
}
