import React from "react"
import { Provider } from "react-redux"
import { createReduxStore, sagaMiddleware } from "./src/governor"
import { rootSaga } from "./src/governor/saga"

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createReduxStore()
  sagaMiddleware.run(rootSaga)

  return <Provider store={store}>{element}</Provider>
}
