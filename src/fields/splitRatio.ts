import type { SelectField } from 'payload'

/** Shared "content column vs. image/side column" width ratio, used by every split-style
 *  block (steps+screenshot, text+highlight cards, cards+figure, etc). The option label is
 *  always "main - side" so editors can reason about it the same way across every block. */
export const splitRatioField = (overrides: Partial<SelectField> = {}): SelectField => {
  const base: SelectField = {
    name: 'columnRatio',
    type: 'select',
    admin: { description: 'Width split between the main column and the side column.' },
    defaultValue: '50-50',
    label: 'Column widths',
    options: [
      { label: '50% - 50%', value: '50-50' },
      { label: '60% - 40%', value: '60-40' },
      { label: '40% - 60%', value: '40-60' },
      { label: '70% - 30%', value: '70-30' },
      { label: '30% - 70%', value: '30-70' },
    ],
  }
  return { ...base, ...overrides } as SelectField
}

/** Turns a "60-40" value into a CSS grid-template-columns string, e.g. "60% 40%". */
export const splitRatioToColumns = (ratio?: string | null): string | undefined => {
  if (!ratio) return undefined
  const [main, side] = ratio.split('-')
  if (!main || !side) return undefined
  return `${main}% ${side}%`
}
