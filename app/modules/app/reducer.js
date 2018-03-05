import { fromJS } from 'immutable'

import {
  composeReducers,
} from '../reduce.helper'

import actions from './actions'

const initialState = fromJS({})

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_APP_LOCATION_SUCCESS:
      return state.set('location', fromJS(action.payload))
    case actions.GET_APP_LOCATION_FAILURE:
      return state.delete('location')
    default:
      return state
  }
}

export default composeReducers(reducer)
