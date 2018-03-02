import moment from 'moment'
import { fromJS } from 'immutable'
import { normalize } from '@app/utils/data.helper'
import l10n from '@locale/strings_ru'
import {
  createFailureActionName,
  createRequestActionName,
  createSuccessActionName,
} from '@app/modules/action.helper'

export const setStartLoading = state => state.set('loading', true)

export const setResult = ({ payload }) => (state) => {
  const { result, entities } = normalize(payload)
  return state
    .set('entities', fromJS(entities))
    .set('result', fromJS(result))
    .set('loadedAt', moment().format())
    .delete('error')
    .set('loading', false)
}

export const setError = ({ error }) => (state) => {
  const errorMessage = (
    error && error.errorMessage
  ) || l10n.server_error__internal

  return state
    .set('error', errorMessage)
    .set('loading', false)
}

export const getDefaultState = () => fromJS({
  entities: {},
  result: [],
  loadedAt: undefined,
  loading: false,
})

export const getEmptyState = () => fromJS({})

export const composeReducers = (...reducers) => (state, action) => (
  reducers
    .reduce(
      (state, reducer) => reducer(state, action),
      state
    )
)

export const loadEntityReducer = (entityName) => {
  const request = createRequestActionName('load')(entityName)
  const success = createSuccessActionName('load')(entityName)
  const failure = createFailureActionName('load')(entityName)

  return (state, action = {}) => {
    switch (action.type) {
      case request:
        return setStartLoading(state)
      case success:
        return setResult(action)(state)
      case failure:
        return setError(action)(state)
      default:
        return state
    }
  }
}
