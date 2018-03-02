import _toUpper from 'lodash/fp/toUpper'

const getPrefix = actionName => entityName => (
  `${_toUpper(actionName)}_${_toUpper(entityName)}`
)

export const createActionName = actionName => entityName => (
  `${getPrefix(actionName)(entityName)}`
)

export const createRequestActionName = actionName => entityName => (
  `${getPrefix(actionName)(entityName)}_REQUEST`
)

export const createSuccessActionName = actionName => entityName => (
  `${getPrefix(actionName)(entityName)}_SUCCESS`
)

export const createFailureActionName = actionName => entityName => (
  `${getPrefix(actionName)(entityName)}_FAILURE`
)

export const createAction = actionName => payload => ({
  type: actionName,
  payload,
})
