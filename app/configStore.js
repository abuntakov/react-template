/* global DEVELOPMENT */
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogicMiddleware } from 'redux-logic'

import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
import history from './history'
import rootReducer from './modules/reducers'
import logic from './modules/logics'
import { catchErrors } from './middlewares'
import httpClient from './utils/request'

const router = routerMiddleware(history)

const logicMiddleware = createLogicMiddleware(logic, { httpClient })

const middlewares = [
  catchErrors,
  logicMiddleware,
  router,
]

let devToolsExtension = f => f

if (DEVELOPMENT) {
  const { createLogger } = require('redux-logger')

  const logger = createLogger({ collapsed: true })
  middlewares.push(logger)

  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension()
  }
}

export default function configureStore(initialState) {
  const store = createStore(connectRouter(history)(rootReducer), initialState, compose(
    applyMiddleware(...middlewares),
    devToolsExtension
  ))

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const nextRootReducer = require('./modules/reducers').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
