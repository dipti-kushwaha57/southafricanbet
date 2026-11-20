import type { Block } from 'payload'

import { splitRatioField } from '@/fields/splitRatio'
import { reviewSectionFields } from '../review/fields'

export const ReviewSteps: Block = {
  slug: 'reviewSteps',
  interfaceName: 'ReviewStepsBlock',
  labels: { plural: 'Review Steps', singular: 'Review Steps' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'text' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional screenshot beside the steps.' } },
    { name: 'caption', type: 'text', admin: { description: 'Small note under the screenshot.' } },
    splitRatioField({ admin: { description: 'Width split between the steps list and the screenshot.' } }),
  ],
}
