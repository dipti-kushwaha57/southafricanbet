import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { REVIEW_ICON_OPTIONS } from '@/blocks/review/icons'

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
        {
          label: 'Contact Hero (badge + heading + CTAs + response card)',
          value: 'contactHero',
        },
        {
          label: 'About Hero (badge + heading + CTAs + mission card + mini stats)',
          value: 'aboutHero',
        },
        {
          label: 'Legal Hero (badge + heading + meta row + at-a-glance tiles)',
          value: 'legalHero',
        },
      ],
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['bettingHero', 'contactHero', 'aboutHero', 'legalHero'].includes(type),
        description: 'Small pill above the heading, e.g. "Licensed by SA provincial boards"',
      },
    },
    {
      name: 'headingLine1',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['bettingHero', 'contactHero', 'aboutHero', 'legalHero'].includes(type),
        description: 'First line of the H1, e.g. "Online Sports Betting". When set, the rich text below is only the intro paragraph.',
      },
      label: 'Heading line 1',
    },
    {
      name: 'headingLine2',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['bettingHero', 'contactHero', 'aboutHero'].includes(type),
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
        condition: (_, { type } = {}) => ['bettingHero', 'contactHero', 'aboutHero'].includes(type),
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
      name: 'responseStatus',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'contactHero',
        description: 'Contact Hero only: small status pill above the response time, e.g. "Team replying today".',
      },
    },
    {
      name: 'responseTime',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'contactHero',
        description: 'Contact Hero only: big stat on the response card, e.g. "Within 24 hrs".',
      },
    },
    {
      name: 'responseNote',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'contactHero',
        description: 'Contact Hero only: small note under the response time, e.g. "Monday to Friday".',
      },
    },
    {
      name: 'stats',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'contactHero',
        description: 'Contact Hero only: up to 3 small stat tiles (e.g. SA Time / Team / Based In).',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
      maxRows: 3,
    },
    {
      name: 'helpNote',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => type === 'contactHero',
        description: 'Contact Hero only: short alert text at the bottom of the response card.',
      },
    },
    {
      name: 'missionIcon',
      type: 'select',
      admin: {
        condition: (_, { type } = {}) => type === 'aboutHero',
        description: 'About Hero only: icon on the mission card.',
      },
      options: REVIEW_ICON_OPTIONS,
    },
    {
      name: 'missionEyebrow',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'aboutHero',
        description: 'About Hero only: small label above the mission quote, e.g. "Our mission".',
      },
      defaultValue: 'Our mission',
    },
    {
      name: 'missionQuote',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => type === 'aboutHero',
        description: 'About Hero only: the big quote text on the mission card.',
      },
    },
    {
      name: 'missionCaption',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => type === 'aboutHero',
        description: 'About Hero only: small caption under the mission quote.',
      },
    },
    {
      name: 'miniStats',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['aboutHero', 'legalHero'].includes(type),
        description:
          'About/Legal Hero only: up to 4 small tiles under the hero (e.g. "100% South African / Local market focus").',
      },
      fields: [
        { name: 'icon', type: 'select', options: REVIEW_ICON_OPTIONS },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
      ],
      maxRows: 4,
    },
    {
      name: 'updatedLabel',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'legalHero',
        description: 'Legal Hero only: e.g. "Last updated: 20 November 2026".',
      },
    },
    {
      name: 'readInfo',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'legalHero',
        description: 'Legal Hero only: e.g. "8 sections · about 3 min read".',
      },
    },
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
