import _compose from 'lodash/fp/compose'
import _upperFirst from 'lodash/fp/upperFirst'

import { createLogic } from 'redux-logic'

import * as routes from '@app/apiRoutes'

import {
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
} from './action.helper'

const injectPrevAction = prevAction => action => ({
  ...action,
  prevAction,
})

export const createLoadEntitiesProcess = (entityName, actionName, actionsFn) => async ({ httpClient, action }, dispatch, done) => {
  const EntityName = _upperFirst(entityName)

  try {
    const result = await httpClient(routes[`${actionName}${EntityName}`]())
    _compose(
      dispatch,
      actionsFn[`${actionName}${EntityName}Success`]
    )(result)
  } catch (error) {
    _compose(
      dispatch,
      injectPrevAction(action),
      actionsFn[`${actionName}${EntityName}Failure`]
    )(error)
  }

  done()
}

export const createLoadEntitiesLogic = (entityName, actionName, actionsFn) => createLogic({
  type: createRequestActionName(actionName)(entityName),
  process: createLoadEntitiesProcess(entityName, actionName, actionsFn),
  latest: true,
})


export const createPromiseProcess = promiseFn => () => promiseFn()

export const createPromiseLogic = (entityName, actionName, promiseFn) => createLogic({
  type: createRequestActionName(actionName)(entityName),
  processOptions: {
    successType: createSuccessActionName(actionName)(entityName),
    failType: createFailureActionName(actionName)(entityName),
  },
  process: createPromiseProcess(promiseFn),
  latest: true,
})
