import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required }) => {
  return (
    <Width className="form-field is-full" width={100}>
      <label className="form-checkbox-row" htmlFor={name}>
        <input
          className="form-checkbox"
          defaultChecked={defaultValue}
          id={name}
          type="checkbox"
          {...register(name, { required })}
        />
        <span>
          {label}
          {required && <span className="form-required">*</span>}
        </span>
      </label>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
