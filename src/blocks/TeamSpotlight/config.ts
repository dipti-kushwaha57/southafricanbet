import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionFields } from '@/fields/sectionFields'

export const TeamSpotlight: Block = {
  slug: 'teamSpotlight',
  interfaceName: 'TeamSpotlightBlock',
  labels: {
    plural: 'Team Spotlight Blocks',
    singular: 'Team Spotlight',
  },
  fields: [
    ...sectionFields,
    {
      type: 'row',
      fields: [
        { name: 'initials', type: 'text', admin: { width: '25%' }, defaultValue: 'DK' },
        { name: 'name', type: 'text', admin: { width: '25%' }, required: true },
        { name: 'role', type: 'text', admin: { width: '25%' } },
        { name: 'verifiedLabel', type: 'text', admin: { width: '25%' }, defaultValue: 'Verified author' },
      ],
    },
    {
      name: 'bioLead',
      type: 'text',
      admin: { description: 'Bold lead-in words at the start of the bio, e.g. "Dennis brings".' },
      label: 'Bio lead-in',
    },
    {
      name: 'bioBold',
      type: 'text',
      admin: { description: 'Bold phrase right after the lead-in, e.g. "over a decade of hands-on experience".' },
      label: 'Bio bold phrase',
    },
    { name: 'bioRest', type: 'textarea', label: 'Rest of the bio' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    link({
      appearances: false,
      overrides: {
        name: 'authorLink',
      },
    }),
  ],
}
