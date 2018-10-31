import {
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
  createAction
} from '../action.helper'

const actions = {
  GET_APP_LOCATION_REQUEST: createRequestActionName('appLocation', 'get'),
  GET_APP_LOCATION_SUCCESS: createSuccessActionName('appLocation', 'get'),
  GET_APP_LOCATION_FAILURE: createFailureActionName('appLocation', 'get'),

}

export const getLocation = createAction(actions.GET_APP_LOCATION_REQUEST)

export default actions
