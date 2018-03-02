import {
  composeReducers,
} from '../reduce.helper'

const initialState = {}


function reducer(state = initialState) {
  return state
}

export default composeReducers(reducer)
