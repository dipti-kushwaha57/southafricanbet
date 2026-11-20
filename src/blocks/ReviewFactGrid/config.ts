import type { Block } from 'payload'

import { columnsField, reviewSectionFields } from '../review/fields'

export const ReviewFactGrid: Block = {
  slug: 'reviewFactGrid',
  interfaceName: 'ReviewFactGridBlock',
  labels: { plural: 'Review Fact Grids', singular: 'Review Fact Grid' },
  fields: [
    ...reviewSectionFields,
    columnsField('2'),
    {
      name: 'facts',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showPaymentMethods',
          type: 'checkbox',
          admin: { description: "Adds a row with this review's payment method logos.", width: '40%' },
          defaultValue: false,
        },
        {
          name: 'paymentsLabel',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.showPaymentMethods),
            width: '60%',
          },
          defaultValue: 'Payment methods',
        },
      ],
    },
  ],
}
