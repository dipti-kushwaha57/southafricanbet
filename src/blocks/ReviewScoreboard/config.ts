import type { Block } from 'payload'

import { reviewIconField, reviewSectionFields } from '../review/fields'

export const ReviewScoreboard: Block = {
  slug: 'reviewScoreboard',
  interfaceName: 'ReviewScoreboardBlock',
  labels: { plural: 'Review Scoreboards', singular: 'Review Scoreboard' },
  fields: [
    ...reviewSectionFields,
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Short line under the overall score. The score and stars come from the review rating.' },
      label: 'Score card text',
    },
    {
      name: 'stats',
      type: 'array',
      admin: { description: 'Small stat tiles under the score (e.g. Active SA players).' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
      maxRows: 2,
    },
    { name: 'testedLabel', type: 'text', defaultValue: 'Tested with real money', label: 'Footnote under stats' },
    {
      name: 'categories',
      type: 'array',
      fields: [
        reviewIconField(),
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'score', type: 'number', admin: { step: 0.1 }, max: 5, min: 0, required: true },
      ],
      label: 'Score categories',
    },
    { name: 'highlightsHeading', type: 'text', defaultValue: 'Highlights' },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
