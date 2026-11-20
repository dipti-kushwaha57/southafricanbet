import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewBonus: Block = {
  slug: 'reviewBonus',
  interfaceName: 'ReviewBonusBlock',
  labels: { plural: 'Review Bonus Cards', singular: 'Review Bonus Card' },
  fields: [
    ...reviewSectionFields,
    { name: 'tag', type: 'text', defaultValue: 'Welcome bonus', label: 'Small label' },
    {
      name: 'title',
      type: 'text',
      admin: { description: "Leave empty to use the review's Bonus Headline." },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
      label: 'Terms table',
    },
    {
      name: 'calculator',
      type: 'group',
      admin: { description: 'Optional "Bonus calculator" shown beside the bonus card.' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false, label: 'Show calculator' },
        {
          type: 'row',
          fields: [
            { name: 'currency', type: 'text', admin: { width: '20%' }, defaultValue: 'R' },
            { name: 'matchPercent', type: 'number', admin: { description: 'e.g. 100', width: '40%' }, defaultValue: 100, label: 'Match %' },
            { name: 'maxBonus', type: 'number', admin: { width: '40%' }, defaultValue: 5000, label: 'Max bonus' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'minDeposit', type: 'number', admin: { width: '25%' }, defaultValue: 20 },
            { name: 'maxDeposit', type: 'number', admin: { width: '25%' }, defaultValue: 6000 },
            { name: 'step', type: 'number', admin: { width: '25%' }, defaultValue: 10 },
            { name: 'defaultDeposit', type: 'number', admin: { width: '25%' }, defaultValue: 1000 },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'sportsRollover', type: 'number', admin: { description: 'Times (e.g. 8)', width: '50%' }, defaultValue: 8 },
            { name: 'casinoRollover', type: 'number', admin: { description: 'Times (e.g. 40)', width: '50%' }, defaultValue: 40 },
          ],
        },
        { name: 'tip', type: 'textarea', label: 'Tip under the results' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: { description: 'Leave empty for "Claim <bonus headline>". The link is the review\'s Play Now link.' },
      label: 'Button label',
    },
  ],
}
