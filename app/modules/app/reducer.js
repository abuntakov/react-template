import {
  composeReducers,
  getEmptyState,
} from '../reduce.helper'

import {
  createSuccessActionName,
  // createFailureActionName,
} from '../action.helper'

const initialState = getEmptyState()


function reducer(state = initialState, action) {
  switch (action.type) {
    case createSuccessActionName('getLocation')('app'):
      return state.set('location', action.payload)
    default:
      return state
  }
}

export default composeReducers(reducer)
