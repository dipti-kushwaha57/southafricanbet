import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionFields } from '@/fields/sectionFields'

export const ReviewsBlock: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlock',
  labels: {
    plural: 'Reviews Blocks',
    singular: 'Reviews Block',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'card-grid',
      options: [
        { label: 'Compact Ranked List', value: 'compact-list' },
        { label: 'Card Grid', value: 'card-grid' },
        { label: 'Hand-Picked Detailed List', value: 'detailed-list' },
      ],
      required: true,
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured Reviews', value: 'featured' },
        { label: 'Manually Selected', value: 'selected' },
      ],
      required: true,
    },
    ...sectionFields,
    {
      name: 'initialVisible',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.variant === 'card-grid',
        description: 'Card grid: how many cards show before the "Show all" button. 0 shows everything.',
        step: 1,
      },
      defaultValue: 5,
      label: 'Cards shown initially',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.source === 'featured',
        step: 1,
      },
      defaultValue: 5,
      label: 'Limit',
    },
    {
      name: 'selectedReviews',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.source === 'selected',
      },
      hasMany: true,
      label: 'Selected Reviews',
      relationTo: 'reviews',
    },
    link({
      overrides: {
        name: 'viewAllLink',
        admin: {
          condition: (_, siblingData) => siblingData?.variant === 'compact-list',
          hideGutter: true,
        },
      },
    }),
  ],
}
