import {
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
  createAction
} from '../action.helper'

const actions = {}

export const loadUsers = createAction(createRequestActionName('load')('user'))
export const loadUsersSuccess = createAction(createSuccessActionName('load')('user'))
export const loadUsersFailure = createAction(createFailureActionName('load')('user'))

export default actions
