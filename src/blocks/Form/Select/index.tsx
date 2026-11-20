import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, defaultValue, errors, label, options, required, width }) => {
  return (
    <Width className="form-field is-full" width={width}>
      <fieldset>
        <legend className="sr-only">{label}</legend>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field: { onChange, value } }) => (
            <div className="form-pill-row">
              {options.map((opt) => (
                <button
                  aria-pressed={value === opt.value}
                  className={`form-pill${value === opt.value ? ' is-active' : ''}`}
                  key={opt.value}
                  onClick={() => onChange(opt.value)}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          rules={{ required }}
        />
      </fieldset>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
