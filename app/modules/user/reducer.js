import {
  getDefaultState,
  loadEntityReducer,
  composeReducers,
} from '../reduce.helper'

const initialState = getDefaultState()


function reducer(state = initialState) {
  return state
}

export default composeReducers(reducer, loadEntityReducer('user'))

