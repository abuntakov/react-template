import {
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
  createAction
} from '../action.helper'

const actions = {}

export const loadUsers = createAction(createRequestActionName('load')('users'))
export const loadUsersSuccess = createAction(createSuccessActionName('load')('users'))
export const loadUsersFailure = createAction(createFailureActionName('load')('users'))

export default actions
