import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React, { useState } from 'react'

import { Error } from '../Error'
import { FIELD_PLACEHOLDERS } from '../placeholders'
import { Width } from '../Width'

const MAX_LENGTH = 1000

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 5, width }) => {
  const [length, setLength] = useState(defaultValue?.length || 0)
  const { onChange, ...rest } = register(name, { required })

  return (
    <Width width={width}>
      <div className="form-label-row">
        <label className="form-label" htmlFor={name}>
          {label}
          {required && <span className="form-required">*</span>}
        </label>
        <span className="form-char-count">
          {length}/{MAX_LENGTH}
        </span>
      </div>
      <textarea
        className="form-textarea"
        defaultValue={defaultValue}
        id={name}
        maxLength={MAX_LENGTH}
        onChange={(e) => {
          setLength(e.target.value.length)
          onChange(e)
        }}
        placeholder={FIELD_PLACEHOLDERS[name]}
        rows={rows}
        {...rest}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
