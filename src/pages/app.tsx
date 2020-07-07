import { RouteComponentProps, Router } from "@reach/router"
import Layout from "components/layout"
import LoginPage from "components/LoginPage/Login"
import PlayPage from "components/PlayPage/PlayPage"
import SignUpPage from "components/SignUpPage/SignUp"
import React from "react"

const App = (_: RouteComponentProps) => {
  return (
    <Layout>
      <Router basepath="/app/">
        <RouterPage path="/login" pageComponent={<LoginPage />} />
        <RouterPage path="/signup" pageComponent={<SignUpPage />} />
        <RouterPage path="/play" pageComponent={<PlayPage />} />
      </Router>
    </Layout>
  )
}

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent

export default App
