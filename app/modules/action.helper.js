import _toUpper from 'lodash/fp/toUpper'

const getPluralPrefix = actionName => entityName => (
  `${_toUpper(actionName)}_${_toUpper(entityName)}S`
)

const getPrefix = actionName => entityName => (
  `${_toUpper(actionName)}_${_toUpper(entityName)}`
)

export const createActionName = actionName => entityName => (
  `${entityName}/${getPrefix(actionName)(entityName)}`
)

export const createRequestActionName = actionName => entityName => (
  `${entityName}/${getPluralPrefix(actionName)(entityName)}_REQUEST`
)

export const createSuccessActionName = actionName => entityName => (
  `${entityName}/${getPluralPrefix(actionName)(entityName)}_SUCCESS`
)

export const createFailureActionName = actionName => entityName => (
  `${entityName}/${getPluralPrefix(actionName)(entityName)}_FAILURE`
)

export const createAction = actionName => payload => ({
  type: actionName,
  payload,
})
