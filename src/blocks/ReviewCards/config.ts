import type { Block } from 'payload'

import { splitRatioField } from '@/fields/splitRatio'

import { columnsField, reviewIconField, reviewSectionFields } from '../review/fields'

export const ReviewCards: Block = {
  slug: 'reviewCards',
  interfaceName: 'ReviewCardsBlock',
  labels: { plural: 'Review Card Grids', singular: 'Review Card Grid' },
  fields: [
    ...reviewSectionFields,
    columnsField('3'),
    {
      name: 'variant',
      type: 'select',
      admin: {
        description:
          'Card = stacked card. Row = icon beside the text. Contact = icon, small label, bold value and note (support channels, key facts).',
      },
      defaultValue: 'card',
      options: [
        { label: 'Card', value: 'card' },
        { label: 'Row', value: 'row' },
        { label: 'Contact / key fact', value: 'contact' },
        { label: 'Plain (icon above text)', value: 'plain' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        reviewIconField({ admin: { description: 'Optional' } }),
        { name: 'tag', type: 'text', admin: { description: 'Optional small label above the title (a pill, or plain text in the Contact style).' } },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
    {
      name: 'sideImage',
      type: 'upload',
      admin: { description: 'Optional screenshot shown beside the cards (cards stack in one column).' },
      relationTo: 'media',
    },
    { name: 'sideCaption', type: 'text' },
    splitRatioField({
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.sideImage),
        description: 'Width split between the cards column and the image column.',
      },
    }),
    {
      name: 'callout',
      type: 'group',
      admin: { description: 'Optional highlighted note shown under the cards.' },
      fields: [
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'warning',
          options: [
            { label: 'Warning (red)', value: 'warning' },
            { label: 'Success (green)', value: 'success' },
            { label: 'Info (amber)', value: 'info' },
          ],
        },
        reviewIconField({ defaultValue: 'info' }),
        { name: 'title', type: 'text' },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}
