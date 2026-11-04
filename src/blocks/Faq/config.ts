import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionFields } from '@/fields/sectionFields'

export const Faq: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlock',
  labels: {
    plural: 'FAQ Blocks',
    singular: 'FAQ Block',
  },
  fields: [
    ...sectionFields,
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
      minRows: 1,
      required: true,
    },
    {
      name: 'quickLinksHeading',
      type: 'text',
      defaultValue: 'Quick Explore',
    },
    {
      name: 'quickLinks',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      label: 'Quick Explore links',
    },
    link({
      appearances: false,
      overrides: {
        name: 'ctaLink',
      },
    }),
  ],
}
