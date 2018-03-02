import _compose from 'lodash/fp/compose'
import _upperFirst from 'lodash/fp/upperFirst'

import { createLogic } from 'redux-logic'

import * as routes from '@app/apiRoutes'

import { createRequestActionName } from './action.helper'

const injectPrevAction = prevAction => action => ({
  ...action,
  prevAction,
})

export const createLoadEntitiesProcess = (entityName, actionsFn) => async ({ httpClient, action }, dispatch, done) => {
  const EntityName = _upperFirst(entityName)

  try {
    const result = await httpClient(routes[`load${EntityName}s`]())
    _compose(
      dispatch,
      actionsFn[`load${EntityName}sSuccess`]
    )(result)
  } catch (error) {
    _compose(
      dispatch,
      injectPrevAction(action),
      actionsFn[`load${EntityName}sFailure`]
    )(error)
  }

  done()
}

export const createLoadEntitiesLogic = (entityName, actionsFn) => createLogic({
  type: createRequestActionName('load')(entityName),
  process: createLoadEntitiesProcess(entityName, actionsFn),
})
