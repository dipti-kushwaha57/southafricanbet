import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewCompare: Block = {
  slug: 'reviewCompare',
  interfaceName: 'ReviewCompareBlock',
  labels: { plural: 'Review Head-to-Heads', singular: 'Review Head-to-Head' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'opponent',
      type: 'relationship',
      admin: { description: 'Logo, rating, bonus and review link come from this bookmaker.' },
      relationTo: 'reviews',
      required: true,
    },
    { name: 'opponentShortName', type: 'text', admin: { description: 'Short tag in the score chips (e.g. HWB).' } },
    { name: 'badge', type: 'text', defaultValue: 'Our pick', label: 'Badge on this bookmaker' },
    {
      name: 'rows',
      type: 'array',
      admin: {
        description:
          'Bonus rows use each review\'s Bonus Headline, Rating rows use each review\'s rating. Custom rows use your own text.',
      },
      fields: [
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'custom',
          options: [
            { label: 'Custom text', value: 'custom' },
            { label: 'Welcome bonus (from reviews)', value: 'bonus' },
            { label: 'Rating (from reviews)', value: 'rating' },
          ],
        },
        { name: 'label', type: 'text', required: true },
        {
          type: 'row',
          fields: [
            {
              name: 'ourValue',
              type: 'text',
              admin: { condition: (_d, s) => s?.kind === 'custom', width: '50%' },
              label: 'This bookmaker',
            },
            {
              name: 'theirValue',
              type: 'text',
              admin: { condition: (_d, s) => s?.kind === 'custom', width: '50%' },
              label: 'Opponent',
            },
          ],
        },
        {
          name: 'winner',
          type: 'select',
          admin: { description: 'Rating rows pick the winner automatically.' },
          defaultValue: 'tie',
          options: [
            { label: 'This bookmaker', value: 'ours' },
            { label: 'Opponent', value: 'theirs' },
            { label: 'Tie / no winner', value: 'tie' },
          ],
        },
      ],
    },
    { name: 'summary', type: 'text', admin: { description: 'Sentence under the score (e.g. who edges what).' } },
  ],
}
