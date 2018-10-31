import {
  getDefaultState,
  entityRequestReducer,
  composeReducers,
} from '../reduce.helper'

const initialState = getDefaultState()


function reducer(state = initialState) {
  return state
}

export default composeReducers(reducer, entityRequestReducer('users', 'load'))
