import { Redirect, RouteComponentProps } from "@reach/router"
import { useAuth } from "hooks/useAuth"
import React, { FunctionComponent } from "react"

export enum AuthRouteType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

interface AuthRouteProps {
  page: FunctionComponent<any>
  type: AuthRouteType
}

const AuthRoute = ({ page, type }: AuthRouteProps & RouteComponentProps) => {
  const { isLoading, userData } = useAuth()
  const Page = page

  if (isLoading) {
    return <h1>LOADING...</h1>
  } else if (userData?.userId) {
    if (type === AuthRouteType.PUBLIC) {
      return <Redirect {...{ user: userData }} to="/app/play" noThrow />
    } else if (type === AuthRouteType.PRIVATE) {
      return <Page {...{ user: userData }} />
    }
  } else {
    // Otherwise, send them to the page they've requested.
    if (type === AuthRouteType.PUBLIC) {
      return <Page />
    } else if (type === AuthRouteType.PRIVATE) {
      return <Redirect to="/app/login" noThrow />
    }
  }
}

export default AuthRoute
