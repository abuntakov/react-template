import {
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
  createAction
} from '../action.helper'

const actions = {
  GET_APP_LOCATION_REQUEST: createRequestActionName('get')('appLocation'),
  GET_APP_LOCATION_SUCCESS: createSuccessActionName('get')('appLocation'),
  GET_APP_LOCATION_FAILURE: createFailureActionName('get')('appLocation'),

}

export const getLocation = createAction(actions.GET_APP_LOCATION_REQUEST)
export const getLocationSuccess = createAction(actions.GET_APP_LOCATION_SUCCESS)
export const getLocationFailure = createAction(actions.GET_APP_LOCATION_FAILURE)

export default actions
