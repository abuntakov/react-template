import {
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
  createAction
} from '../action.helper'

const actions = {}

export const getLocation = createAction(createRequestActionName('getLocation')('app'))
export const getLocationSuccess = createAction(createSuccessActionName('getLocation')('app'))
export const getLocationFailure = createAction(createFailureActionName('getLocation')('app'))

export default actions
