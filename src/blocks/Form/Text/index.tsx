import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { FIELD_PLACEHOLDERS } from '../placeholders'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      <input
        className="form-input"
        defaultValue={defaultValue}
        id={name}
        placeholder={FIELD_PLACEHOLDERS[name]}
        type="text"
        {...register(name, { required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
