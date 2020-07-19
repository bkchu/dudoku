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

// class PublicRoute extends React.Component<IAuthRouteProps, IAuthRouteState> {
//   constructor(props) {
//     super(props)
//     this.state = {
//       user: null,
//       isLoading: true,
//       page: this.props.component,
//     }
//   }

//   componentDidMount() {
//     // Check the user's session and set the state.
//     userbase
//       .init({ appId: process.env.GATSBY_REACT_APP_USERBASE_APP_ID as string })
//       .then(session => {
//         this.setState(state => {
//           return {
//             ...state,
//             isLoading: false,
//             user: session.user ? session.user : null,
//           }
//         })
//       })
//   }

//   render() {
//     const Page = this.state.page
//     // If the page is loading, indicate we are still performing our session check.
//     if (this.state.isLoading) {
//       return (
//         <Layout>
//           <h1>LOADING...</h1>
//         </Layout>
//       )
//     } else if (this.state.user) {
//       // If we have completed our session check and the user is already log in, send them to the todo page.
//       return <Redirect {...{ user: this.state.user }} to="/app/todo" noThrow />
//     }
//     // Otherwise, send them to the page they've requested.
//     return <Page />
//   }
// }

// export default PublicRoute
