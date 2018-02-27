import { LOCATION_CHANGE } from 'react-router-redux'
import { fromJS } from 'immutable'

const initialState = fromJS({
  locationBeforeTransitions: null,
})

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case LOCATION_CHANGE:
      return state.set('locationBeforeTransitions', payload)
    default:
      return state
  }
}
