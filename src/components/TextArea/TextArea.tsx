import React, { FC } from "react"
import { useField } from "formik"
import classnames from 'classnames';
import "./TextArea.css"

interface TextAreaProps {
  label: string
  name: string
  [prop: string]: any
}

const TextArea: FC<TextAreaProps> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props)


  const texteareaClassnames = classnames("textarea__input", {
    "textarea__input--error": meta.error && meta.touched,
  })
  return (
    <div className="textarea">
      <label className="textarea__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        rows={8}
        className={texteareaClassnames}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="textarea__error-text" role="alert" aria-atomic="true">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export default TextArea
