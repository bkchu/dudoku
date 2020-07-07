import classnames from "classnames"
import { useField } from "formik"
import React, { FC } from "react"
import "./Field.css"

interface FieldProps {
  label: string
  name: string
  [prop: string]: any
}

const Field: FC<FieldProps> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props)

  const inputClassnames = classnames("field__input", {
    "field__input--error": meta.error && meta.touched,
  })

  const errorTextClassnames = classnames("field__error-text", {
    "field__error-text--visible": meta.error && meta.touched,
  })

  return (
    <div className="field">
      <label className="field__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className={inputClassnames} {...field} {...props} />
      <div className={errorTextClassnames} role="alert" aria-atomic="true">
        {meta.error}
      </div>
    </div>
  )
}

export default Field
