import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionFields } from '@/fields/sectionFields'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: {
    plural: 'Feature Grid Blocks',
    singular: 'Feature Grid Block',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'steps',
      options: [
        { label: 'Numbered steps (4 columns + tip card)', value: 'steps' },
        { label: 'Criteria (5 columns, numbered circles)', value: 'criteria' },
        { label: 'Sports cards (2 columns, icon + pro tip)', value: 'sports' },
        { label: 'Trust points (5 columns, check icons + quote + CTA)', value: 'trust' },
      ],
      required: true,
    },
    ...sectionFields,
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'upload',
          admin: {
            condition: (data) => data?.variant === 'sports',
            description: 'Sports variant only — small icon image shown next to the title (e.g. a cricket bat, a horse-riding icon).',
          },
          relationTo: 'media',
        },
        {
          name: 'tip',
          type: 'text',
          admin: {
            condition: (data) => data?.variant === 'sports',
            description: 'Sports variant only: the "Pro Tip" text.',
          },
          label: 'Pro tip',
        },
      ],
      minRows: 1,
      required: true,
    },
    {
      name: 'callout',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'steps',
        description: 'Gradient "Tip" card shown after the last step.',
      },
      label: 'Tip card text',
    },
    {
      name: 'quote',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'trust',
      },
    },
    {
      type: 'collapsible',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'trust',
        initCollapsed: false,
      },
      fields: [
        { name: 'ctaHeading', type: 'text' },
        { name: 'ctaText', type: 'textarea' },
        link({
          overrides: {
            name: 'ctaLink',
          },
        }),
      ],
      label: 'Call-to-action banner',
    },
    {
      name: 'numbered',
      type: 'checkbox',
      admin: { hidden: true },
    },
    {
      name: 'columns',
      type: 'select',
      admin: { hidden: true },
      defaultValue: '4',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
    },
  ],
}
