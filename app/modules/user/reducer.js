import {
  getDefaultState,
  loadEntityReducer,
} from '../reduce.helper'

const initialState = getDefaultState()


function reducer(state = initialState, action = {}) {
  return state
}

export default loadEntityReducer('user')(reducer)
