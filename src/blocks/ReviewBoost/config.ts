import type { Block } from 'payload'

import { reviewSectionFields } from '../review/fields'

export const ReviewBoost: Block = {
  slug: 'reviewBoost',
  interfaceName: 'ReviewBoostBlock',
  labels: { plural: 'Review Boost Sliders', singular: 'Review Boost Slider' },
  fields: [
    ...reviewSectionFields,
    { name: 'tag', type: 'text', defaultValue: 'Multi Bet Add-on', label: 'Small label' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'unitLabel', type: 'text', admin: { width: '25%' }, defaultValue: 'legs', label: 'Unit (e.g. legs)' },
        { name: 'min', type: 'number', admin: { width: '25%' }, defaultValue: 2, label: 'Slider min' },
        { name: 'max', type: 'number', admin: { width: '25%' }, defaultValue: 50, label: 'Slider max' },
        { name: 'defaultValue', type: 'number', admin: { width: '25%' }, defaultValue: 10, label: 'Start at' },
      ],
    },
    {
      name: 'tiers',
      type: 'array',
      admin: { description: 'Each tier applies from its "From" value up to the next tier. Bars are drawn from these.' },
      fields: [
        { name: 'from', type: 'number', label: 'From (e.g. 5 legs)', required: true },
        { name: 'boost', type: 'number', label: 'Boost %', required: true },
      ],
      minRows: 1,
    },
    { name: 'footnote', type: 'text', defaultValue: 'Milestones shown. Tap a bar or drag the slider.' },
  ],
}
