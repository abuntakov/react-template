import {
  createActionName,
  createAction
} from '../action.helper'

const actions = {}

export const getLocation = createAction(createActionName('getLocation')('app'))


export default actions
