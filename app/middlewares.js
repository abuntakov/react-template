import _get from 'lodash/fp/get'
import _omit from 'lodash/fp/omit'
import { createAction, createFailureActionName } from './modules/action.helper'

const getErrorCode = _get('payload.errorCode')
const omitErrorCode = _omit('errorCode')
const isGlobalError = action => getErrorCode(action) < 0
const globalErrorAction = createAction(createFailureActionName('connection')('app'))

function forwardError(store, { payload }) {
  store.dispatch(globalErrorAction(omitErrorCode(payload)))
}

function repeatAction(store, { prevAction: { executeWithDelay = 3, ...prevAction } }) {
  store.dispatch({
    ...prevAction,
    executeWithDelay: Math.min(executeWithDelay * 2, 60)
  })
}

export const catchErrors = store => next => (action) => {
  if (isGlobalError(action)) {
    forwardError(store, action)
    repeatAction(store, action)
  }
  return next(action)
}
