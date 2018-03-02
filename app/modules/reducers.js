import { combineReducers } from 'redux-immutable'
import { reducer as reduxFormReducer } from 'redux-form'

import routerReducer from './router/reducer'
import userReducer from './user/reducer'
import appReducer from './app/reducer'

const reducerMap = {
  router: routerReducer,
  app: appReducer,
  form: reduxFormReducer,
  user: userReducer,
}

export default combineReducers(reducerMap)
