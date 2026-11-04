import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Betting Hero (badge + heading + CTAs + reviews widget)',
          value: 'bettingHero',
        },
      ],
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'bettingHero',
        description: 'Small pill above the heading, e.g. "Licensed by SA provincial boards"',
      },
    },
    {
      name: 'headingLine1',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'bettingHero',
        description: 'First line of the H1, e.g. "Online Sports Betting". When set, the rich text below is only the intro paragraph.',
      },
      label: 'Heading line 1',
    },
    {
      name: 'headingLine2',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'bettingHero',
        description: 'Second line of the H1 before the gradient part, e.g. "Sites".',
      },
      label: 'Heading line 2',
    },
    {
      name: 'byline',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'bettingHero',
        description: 'Author byline shown under the CTAs, e.g. "Written by Dennis Kumar"',
      },
    },
    {
      name: 'bylineRole',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'bettingHero',
        description: 'e.g. "Content Writer"',
      },
    },
    {
      name: 'updatedText',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'bettingHero',
        description: 'e.g. "Updated September 21, 2026"',
      },
    },
    {
      name: 'headingHighlight',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'bettingHero',
        description:
          'Portion of the H1 (end of it) rendered in the red gradient, e.g. "South Africa 2026". The rest of the H1 text should come first in Rich Text.',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
