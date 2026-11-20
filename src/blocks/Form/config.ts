import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      admin: {
        description: 'In-page anchor used by menu links, e.g. "form" for /#form.',
      },
      label: 'Anchor ID',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
      label: 'Intro Content',
    },
    {
      name: 'sidebar',
      type: 'group',
      admin: {
        description: 'Optional panel shown beside the form (please-note callout, support email, social links, gambling helpline).',
      },
      fields: [
        {
          name: 'noteTitle',
          type: 'text',
          defaultValue: 'Please note',
        },
        { name: 'noteText', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'noteLinkLabel', type: 'text', admin: { width: '50%' }, label: 'Note link label' },
            { name: 'noteLinkUrl', type: 'text', admin: { width: '50%' }, label: 'Note link URL' },
          ],
        },
        {
          name: 'supportTitle',
          type: 'text',
          defaultValue: 'Email support',
        },
        { name: 'supportEmail', type: 'text' },
        { name: 'supportNote', type: 'text' },
        {
          name: 'showSocial',
          type: 'checkbox',
          admin: { description: "Show the site's social links (from the Footer global)." },
          label: 'Show social links',
        },
        {
          name: 'showGamblingHelp',
          type: 'checkbox',
          admin: { description: 'Show the responsible-gambling helpline (from the Footer global).' },
          label: 'Show gambling helpline',
        },
      ],
      label: 'Sidebar',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
