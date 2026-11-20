import type { Block } from 'payload'

import { REVIEW_ICON_OPTIONS } from '@/blocks/review/icons'

export const LegalSections: Block = {
  slug: 'legalSections',
  interfaceName: 'LegalSectionsBlock',
  labels: {
    plural: 'Legal Section Blocks',
    singular: 'Legal Sections',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'icon', type: 'select', admin: { width: '30%' }, options: REVIEW_ICON_OPTIONS },
            { name: 'heading', type: 'text', admin: { width: '70%' }, required: true },
          ],
        },
        {
          name: 'points',
          type: 'array',
          admin: { description: 'Bullet points for this section (leave empty to use plain text below instead).' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'text',
          type: 'textarea',
          admin: { description: 'Plain paragraph text, used when no bullet points are set above.' },
        },
        {
          name: 'helpline',
          type: 'group',
          admin: { description: 'Optional green helpline callout inside this section (e.g. the NRGP helpline).' },
          fields: [
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'text' },
            { name: 'value', type: 'text', label: 'Phone number' },
            { name: 'linkLabel', type: 'text', label: 'Link text (e.g. a website)' },
            { name: 'linkUrl', type: 'text' },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          admin: { description: 'Optional email/website chip row for a "Contact us" section.' },
          fields: [
            { name: 'email', type: 'text' },
            { name: 'website', type: 'text' },
          ],
        },
      ],
      label: 'Sections',
      minRows: 1,
      required: true,
    },
  ],
}
