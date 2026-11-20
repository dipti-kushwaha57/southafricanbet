import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewPayments: Block = {
  slug: 'reviewPayments',
  interfaceName: 'ReviewPaymentsBlock',
  labels: { plural: 'Review Payment Tables', singular: 'Review Payment Table' },
  fields: [
    ...reviewSectionFields,
    { name: 'note', type: 'text', admin: { description: 'Right-aligned note, e.g. "Min deposit from R5".' } },
    {
      name: 'initialVisible',
      type: 'number',
      admin: { description: 'Rows shown before the "Show all" button.' },
      defaultValue: 8,
      min: 1,
    },
    {
      name: 'tabs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', admin: { description: 'e.g. Deposits' }, required: true },
        { name: 'timeHeading', type: 'text', defaultValue: 'Time' },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'type', type: 'text' },
            { name: 'minimum', type: 'text' },
            { name: 'time', type: 'text' },
            { name: 'fee', type: 'text', defaultValue: 'Free' },
          ],
        },
      ],
      label: 'Tabs (Deposits / Withdrawals)',
      minRows: 1,
    },
  ],
}
