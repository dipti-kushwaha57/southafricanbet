import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionFields } from '@/fields/sectionFields'

export const PostsBlock: Block = {
  slug: 'postsBlock',
  interfaceName: 'PostsBlock',
  labels: {
    plural: 'Posts Blocks',
    singular: 'Posts Block',
  },
  fields: [
    ...sectionFields,
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All (Latest)', value: 'all' },
        { label: 'Manually Selected', value: 'selected' },
        { label: 'By Category', value: 'category' },
      ],
      required: true,
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.mode !== 'selected',
        step: 1,
      },
      defaultValue: 5,
      label: 'Limit',
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.mode === 'category',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.mode === 'selected',
      },
      hasMany: true,
      label: 'Selected Posts',
      relationTo: 'posts',
    },
    link({
      overrides: {
        name: 'viewAllLink',
      },
    }),
  ],
}
