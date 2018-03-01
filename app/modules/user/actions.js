import {
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
} from '../action.helper'

const actions = {}


export const loadUsers = () => ({
  type: createRequestActionName('load')('user'),
})

export const loadUsersSuccess = users => ({
  type: createSuccessActionName('load')('user'),
  payload: users,
})

export const loadUsersFailure = prevAction => err => ({
  type: createFailureActionName('load')('user'),
  payload: err,
  prevAction,
})

export default actions
