import _snakeCase from 'lodash/fp/snakeCase'
import _pipe from 'lodash/fp/pipe'
import _toUpper from 'lodash/fp/toUpper'

const normalizeName = _pipe([_snakeCase, _toUpper])

const createActionName = actionName => entityName => (
  `${normalizeName(actionName)}_${normalizeName(entityName)}`
)

export const createRequestActionName = actionName => entityName => (
  `${createActionName(actionName)(entityName)}_REQUEST`
)

export const createSuccessActionName = actionName => entityName => (
  `${createActionName(actionName)(entityName)}_SUCCESS`
)

export const createFailureActionName = actionName => entityName => (
  `${createActionName(actionName)(entityName)}_FAILURE`
)

export const createAction = actionName => payload => ({
  type: actionName,
  payload,
})
