import moment from 'moment'
import { fromJS } from 'immutable'
import { normalize } from '@app/utils/data.helper'
import l10n from '@locale/strings_ru'

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
  ) || l10n.server_error_internal

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
