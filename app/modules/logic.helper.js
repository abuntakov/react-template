import _compose from 'lodash/fp/compose'
import _upperFirst from 'lodash/fp/upperFirst'

import { createLogic } from 'redux-logic'

import * as routes from '@app/apiRoutes'

import { createRequestActionName } from './action.helper'

export const createLoadEntitiesProcess = (entityName, actionsFn) => ({ httpClient, action }, dispatch, done) => {
  const EntityName = _upperFirst(entityName)

  httpClient(routes[`load${EntityName}s`]())
    .then(_compose(dispatch, actionsFn[`load${EntityName}sSuccess`]))
    .catch(_compose(dispatch, actionsFn[`load${EntityName}sFailure`](action)))
    .then(() => done())
}

export const createLoadEntitiesLogic = (entityName, actionsFn) => createLogic({
  type: createRequestActionName('load')(entityName),
  process: createLoadEntitiesProcess(entityName, actionsFn),
})
