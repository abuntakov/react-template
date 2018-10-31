import moment from 'moment'
import { fromJS, Map, List } from 'immutable'
import { normalize } from '@app/utils/data.helper'
import l10n from '@locale/strings_ru'
import _has from 'lodash/fp/has'
import _getOr from 'lodash/fp/getOr'
import {
  createFailureActionName,
  createRequestActionName,
  createSuccessActionName,
} from '@app/modules/action.helper'

const isAction = obj => _has('payload')(obj) && _has('type')(obj)

export const setStartLoading = (path = []) => state => (
  state.setIn([...path, 'loading'], true)
)

export const setEndLoading = (path = []) => state => (
  state
    .setIn([...path, 'loadedAt'], moment().format())
    .setIn([...path, 'loading'], false)
)

export const setResult = ({ payload }, path = [], { append = false, ignoreSame = false } = {}) => (state) => {
  const { result: resultRaw, entities: entitiesRaw } = normalize(payload)
  const result = fromJS(resultRaw)
  const entities = fromJS(entitiesRaw)

  const prev = state.getIn([...path], Map())

  if (ignoreSame && result.isSubset(prev.get('result', List()))) {
    return state
      .deleteIn([...path, 'error'])
      .setIn([...path, 'loading'], false)
  }

  const prevEntities = append ? prev.get('entities', Map()) : Map()
  const prevResult = append ? prev.get('result', List()) : List()

  return setEndLoading(path)(state
    .setIn([...path, 'entities'], prevEntities.merge(fromJS(entities)))
    .setIn([...path, 'result'], prevResult.concat(fromJS(result)))
    .deleteIn([...path, 'error']))
}

export const setItem = (item, path = []) => state => (
  state.setIn(path, fromJS(isAction(item) ? item.payload : item))
)

export const deleteItem = (path = []) => state => (
  state.deleteIn(path)
)

export const resetResult = (path = []) => state => (
  state
    .setIn([...path, 'entities'], Map())
    .setIn([...path, 'result'], List())
)

export const setError = ({ error }, path = []) => (state) => {
  const errorMessage = (
    error && error.errorMessage
  ) || l10n.server_error__internal

  return state
    .setIn([...path, 'error'], errorMessage)
    .setIn([...path, 'loading'], false)
}

export const getDefaultState = () => fromJS({
  entities: {},
  result: [],
  loadedAt: undefined,
  loading: false,
})

export const composeReducers = (...reducers) => (state, action) => (
  reducers
    .reduce(
      (state, reducer) => reducer(state, action),
      state
    )
)

const getPrevExtra = _getOr({ append: false })('prevAction.extra')

export const entityRequestReducer = (entityName, actionGroup, path = [], { setSuccessResult = setResult } = {}) => {
  const request = createRequestActionName(entityName, actionGroup)
  const success = createSuccessActionName(entityName, actionGroup)
  const failure = createFailureActionName(entityName, actionGroup)

  return (state, action = {}) => {
    switch (action.type) {
      case request: {
        const runInBackground = action.extra && action.extra.background
        return runInBackground ? state : setStartLoading(path)(state)
      }
      case success:
        return setSuccessResult(action, path, getPrevExtra(action))(state)
      case failure:
        return setError(action, path)(state)
      default:
        return state
    }
  }
}
