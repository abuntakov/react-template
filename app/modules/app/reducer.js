import {
  composeReducers,
  getInitialState,
} from '../reduce.helper'

import actions from './actions'

const initialState = getInitialState({
  location: {
    address: {
      city: 'Москва',
    },
    kind: 'city',
    position: {
      lat: 55.751244,
      lng: 37.618423,
    },
  }
})


function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_APP_LOCATION_SUCCESS:
      return state.set('location', action.payload)
    case actions.GET_APP_LOCATION_FAILURE:
      return state.delete('location')
    default:
      return state
  }
}

export default composeReducers(reducer)
