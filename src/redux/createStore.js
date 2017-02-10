import { createStore, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

import rootReducer from '_reducers/index'

const middlewaresChain = applyMiddleware(apiMiddleware)
const devtoolsInterceptor = window.devToolsExtension ? window.devToolsExtension() : f => f

const finalCreateStore = compose(middlewaresChain, devtoolsInterceptor)(createStore)

export default function (customInitialState) {
  const store = finalCreateStore(rootReducer, customInitialState)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
