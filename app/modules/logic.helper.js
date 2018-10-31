import _compose from 'lodash/fp/compose'
import _upperFirst from 'lodash/fp/upperFirst'
import _identity from 'lodash/fp/identity'
import { createLogic } from 'redux-logic'

import * as routes from '@app/apiRoutes'

import {
  createAction,
  createRequestActionName,
  createSuccessActionName,
  createFailureActionName,
} from './action.helper'

const injectPrevAction = prevAction => ({ extra = {}, ...action }) => ({
  ...action,
  prevAction,
  extra: {
    ...((prevAction || {}).extra || {}),
    ...extra,
  }
})

export const createEntitiesRequestProcess = (
  entityName,
  actionGroup,
  {
    normalizer = _identity,
    onSuccess = _identity,
    onFailure = _identity,
  } = {}
) => async ({ httpClient, action }, dispatch, done) => {
  const EntityName = _upperFirst(entityName)

  try {
    const result = await httpClient(routes[`${actionGroup}${EntityName}`](action.payload), action.extra)
    _compose(
      dispatch,
      onSuccess,
      normalizer,
      injectPrevAction(action),
      createAction(createSuccessActionName(entityName, actionGroup)),
    )(result)
  } catch (error) {
    _compose(
      dispatch,
      onFailure,
      injectPrevAction(action),
      createAction(createFailureActionName(entityName, actionGroup)),
    )(error)
  }

  done()
}

export const createEntitiesRequestLogic = (entityName, actionGroup, { latest = true, ...extraParams } = {}) => createLogic({
  type: createRequestActionName(entityName, actionGroup),
  process: createEntitiesRequestProcess(entityName, actionGroup, extraParams),
  latest,
})

export const createPromiseLogic = (entityName, actionGroup, promiseFn) => createLogic({
  type: createRequestActionName(entityName, actionGroup),
  processOptions: {
    successType: createSuccessActionName(entityName, actionGroup),
    failType: createFailureActionName(entityName, actionGroup),
  },
  process: ({ action }) => promiseFn(action.payload, action),
  latest: true,
})
