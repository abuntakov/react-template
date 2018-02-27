import { combineReducers } from 'redux-immutable'
import { reducer as reduxFormReducer } from 'redux-form'

import routerReducer from './router/reducer'
import userReducer from './user/reducer'

const reducerMap = {
  router: routerReducer,
  form: reduxFormReducer,
  user: userReducer,
}

export default combineReducers(reducerMap)
