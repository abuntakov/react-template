import {
  getDefaultState,
  setStartLoading,
  setResult,
  setError,
} from '../reduce.helper'

import actions from './actions'

const initialState = getDefaultState()

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_USERS_REQUEST:
      return setStartLoading(state)
    case actions.LOAD_USERS_SUCCESS:
      return setResult(action)(state)
    case actions.LOAD_USERS_FAILURE:
      return setError(action)(state)
    default:
      return state
  }
}
