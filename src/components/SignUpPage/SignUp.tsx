import Button from "components/Button/Button"
import { Form, Formik } from "formik"
import React, { FC, useState } from "react"
import * as Yup from "yup"
import Field from "../Field/Field"
import "./SignUp.css"
import { useAuth } from "hooks/useAuth"
import { navigate } from "gatsby"

const SignUp: FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const { signUp } = useAuth();

  const onSubmit = async (values, actions) => {
    setSubmitted(true)
    if (!submitted) {
      signUp(
        values.username,
        values.password,
        () => {
          actions.setSubmitting(false)
          setSubmitted(false)
          navigate("/app/play")
        },
        () => {
          setSubmitted(false)
        }
      )
    }
  }

  return (
    <div className="sign-up">
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().min(5, "Too Short!").max(20, "Too Long!").required("Required"),
          password: Yup.string().max(35, "Too Long!").required("Required"),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
        })}
      >
        <Form className="sign-up__form">
          <input type="hidden" name="form-name" value="contact-us" />
          <div hidden>
            <label>
              Don’t fill this out:
              <input name="bot-field" />
            </label>
          </div>

          {/* <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-3">
          {submitted ? `We got your message. Thanks!` : `We'd love to hear from you.`}
        </h2> */}
          <Field name="username" type="text" label="Username" placeholder="Enter your username" />
          <Field name="password" type="password" label="Password" />
          <Field name="passwordConfirmation" type="password" label="Confirm Password" />
          <Button className="sign-up__sign-up-btn" type="submit" loading={submitted}>
            Sign Up
          </Button>
        </Form>
      </Formik>
      <Button className="sign-up__login-link" to="/app/login">
        Login
      </Button>
    </div>
  )
}

export default SignUp
