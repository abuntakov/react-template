import _snakeCase from 'lodash/fp/snakeCase'
import _pipe from 'lodash/fp/pipe'
import _toUpper from 'lodash/fp/toUpper'

const normalizeName = _pipe([_snakeCase, _toUpper])

export const createActionName = (entityName, actionGroup) => (
  `${normalizeName(actionGroup)}_${normalizeName(entityName)}`
)

export const createRequestActionName = (entityName, actionGroup) => (
  `${createActionName(entityName, actionGroup)}_REQUEST`
)

export const createSuccessActionName = (entityName, actionGroup) => (
  `${createActionName(entityName, actionGroup)}_SUCCESS`
)

export const createFailureActionName = (entityName, actionGroup) => (
  `${createActionName(entityName, actionGroup)}_FAILURE`
)

export const createAction = actionName => (payload, extra = {}) => ({
  type: actionName,
  payload,
  extra,
})
