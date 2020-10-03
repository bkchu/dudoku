import { RouteComponentProps, Router } from "@reach/router"
import AuthRoute, { AuthRouteType } from "components/AuthRoute/AuthRoute"
import Layout from "components/layout"
import LoginPage from "components/LoginPage/Login"
import PlayPage from "components/PlayPage/PlayPage"
import SignUpPage from "components/SignUpPage/SignUp"
import React from "react"
import AuthProvider from "components/AuthProvider/AuthProvider"

const App = (_: RouteComponentProps) => {
  return (
    <Layout>
      <AuthProvider>
        <Router basepath="/app/">
          <AuthRoute path="/login" type={AuthRouteType.PUBLIC} page={LoginPage} />
          <AuthRoute path="/signup" type={AuthRouteType.PUBLIC} page={SignUpPage} />
          <AuthRoute path="/play" type={AuthRouteType.PRIVATE} page={PlayPage} />
        </Router>
      </AuthProvider>
    </Layout>
  )
}

export default App
