import _toUpper from 'lodash/fp/toUpper'

const getPrefix = actionName => entityName => (
  `${_toUpper(actionName)}_${_toUpper(entityName)}S`
)

export const createRequestActionName = actionName => entityName => (
  `${entityName}/${getPrefix(actionName)(entityName)}_REQUEST`
)

export const createSuccessActionName = actionName => entityName => (
  `${entityName}/${getPrefix(actionName)(entityName)}_SUCCESS`
)

export const createFailureActionName = actionName => entityName => (
  `${entityName}/${getPrefix(actionName)(entityName)}_FAILURE`
)
