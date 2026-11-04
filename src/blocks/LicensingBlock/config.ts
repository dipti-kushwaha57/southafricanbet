import type { Block } from 'payload'

import { sectionFields } from '@/fields/sectionFields'

export const LicensingBlock: Block = {
  slug: 'licensingBlock',
  interfaceName: 'LicensingBlock',
  labels: {
    plural: 'Licensing Blocks',
    singular: 'Licensing Block',
  },
  fields: [
    ...sectionFields,
    {
      name: 'authoritiesHeading',
      type: 'text',
      defaultValue: "South Africa's Main Licensing Authorities",
    },
    {
      name: 'authorities',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
      minRows: 1,
    },
    {
      name: 'proTip',
      type: 'textarea',
      label: 'Pro tip text (shown after a bold "Pro Tip:")',
    },
    {
      name: 'benefitsHeading',
      type: 'text',
      defaultValue: 'Why Licensing Matters',
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
      minRows: 1,
    },
    {
      name: 'benefitsNote',
      type: 'textarea',
    },
  ],
}
