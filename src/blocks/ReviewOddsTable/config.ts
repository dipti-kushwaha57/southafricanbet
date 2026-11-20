import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewOddsTable: Block = {
  slug: 'reviewOddsTable',
  interfaceName: 'ReviewOddsTableBlock',
  labels: { plural: 'Review Odds Tables', singular: 'Review Odds Table' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'opponent',
      type: 'relationship',
      admin: { description: 'The bookmaker you compare against. Its name labels the second row.' },
      relationTo: 'reviews',
    },
    { name: 'tableTitle', type: 'text', admin: { description: 'e.g. "Odds check: 10bet vs Hollywoodbets"' } },
    { name: 'tableNote', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'homeLabel', type: 'text', admin: { width: '33%' }, defaultValue: 'Home' },
        { name: 'drawLabel', type: 'text', admin: { width: '33%' }, defaultValue: 'Draw' },
        { name: 'awayLabel', type: 'text', admin: { width: '34%' }, defaultValue: 'Away' },
      ],
    },
    {
      name: 'fixtures',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'note', type: 'text', admin: { description: 'e.g. +440 markets at 10bet' } },
        {
          name: 'ours',
          type: 'group',
          admin: { description: 'This bookmaker (highlighted green)' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'home', type: 'text', admin: { width: '33%' } },
                { name: 'draw', type: 'text', admin: { width: '33%' } },
                { name: 'away', type: 'text', admin: { width: '34%' } },
              ],
            },
          ],
        },
        {
          name: 'theirs',
          type: 'group',
          admin: { description: 'The opponent' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'home', type: 'text', admin: { width: '33%' } },
                { name: 'draw', type: 'text', admin: { width: '33%' } },
                { name: 'away', type: 'text', admin: { width: '34%' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
