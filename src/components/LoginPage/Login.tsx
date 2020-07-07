import { Form, Formik } from "formik"
import React, { FC, useEffect, useState } from "react"
import * as Yup from "yup"
import Field from "../Field/Field"
import "./Login.css"
import { Link } from "@reach/router"

const userbase = typeof window !== "undefined" ? require("userbase-js").default : null

const Login: FC = () => {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    userbase
      .init({ appId: process.env.GATSBY_USERBASE_APP_ID as string })
      .then(session => session.user && console.log(session.user))
      .catch(error => alert(error))
  }, [])

  const onSubmit = async (values, actions) => {
    userbase
      .signIn({
        username: values.username,
        password: values.password,
        rememberMe: "local",
      })
      .then(user => {
        console.log(user)
        setSubmitted(true)
        actions.setSubmitting(false)
      })
      .catch(err => alert(err))
  }

  return (
    <div className="login">
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
      >
        <Form
          className="login__form"
        >
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
          <div className={`${submitted && "hidden invisible"}`}>
            <Field name="username" type="text" label="Username" placeholder="Enter your username" />
            <Field name="password" type="password" label="Password" />
            <button type="submit" className="login__login-btn">
              Login
            </button>
          </div>
        </Form>
      </Formik>
      <Link className="login__sign-up-link" to="/app/signup">Sign Up</Link>
    </div>
  )
}

export default Login
