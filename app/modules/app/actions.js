import {
  createRequestActionName,
  createAction
} from '../action.helper'

const actions = {}

export const getLocation = createAction(createRequestActionName('getLocation')('app'))

export default actions
