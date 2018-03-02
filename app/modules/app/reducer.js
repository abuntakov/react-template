import {
  composeReducers,
  getEmptyState,
} from '../reduce.helper'

import {
  getLocationSuccess,
  getLocationFailure,
} from './actions'

const initialState = getEmptyState()


function reducer(state = initialState, action) {
  switch (action.type) {
    case getLocationSuccess:
      return state.set('location', action.payload)
    case getLocationFailure:
      return state.delete('location')
    default:
      return state
  }
}

export default composeReducers(reducer)
