import type { Block } from 'payload'

import { reviewIconField, reviewSectionFields } from '../review/fields'

export const ReviewTabsGallery: Block = {
  slug: 'reviewTabsGallery',
  interfaceName: 'ReviewTabsGalleryBlock',
  labels: { plural: 'Review Tabbed Screenshots', singular: 'Review Tabbed Screenshots' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'tabs',
      type: 'array',
      admin: { description: 'e.g. Desktop and Mobile, each with its own screenshot.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        reviewIconField(),
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
      minRows: 1,
    },
  ],
}
