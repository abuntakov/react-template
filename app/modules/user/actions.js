import {
  createRequestActionName,
  createAction
} from '../action.helper'

const actions = {}

export const loadUsers = createAction(createRequestActionName('users', 'load'))

export default actions
