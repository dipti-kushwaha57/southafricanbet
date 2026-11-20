import type { Block } from 'payload'

import { splitRatioField } from '@/fields/splitRatio'
import { reviewIconField, reviewSectionFields } from '../review/fields'

export const ReviewSplit: Block = {
  slug: 'reviewSplit',
  interfaceName: 'ReviewSplitBlock',
  labels: { plural: 'Review Split Sections', singular: 'Review Split Section' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'lead',
      type: 'text',
      admin: { description: 'Bold opening word(s), e.g. "Yes."' },
      label: 'Bold lead-in',
    },
    { name: 'body', type: 'textarea', label: 'Left text' },
    {
      name: 'highlight',
      type: 'group',
      admin: { description: 'Red highlight card under the text (e.g. licence reference).' },
      fields: [
        reviewIconField({ defaultValue: 'lock' }),
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      admin: { description: 'Small cards shown on the right (2 per row).' },
      fields: [
        reviewIconField(),
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
    splitRatioField({ admin: { description: 'Width split between the text column and the cards column.' } }),
  ],
}
