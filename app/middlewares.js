import _get from 'lodash/fp/get'
import _omit from 'lodash/fp/omit'
import { createAction, createFailureActionName } from './modules/action.helper'

const getErrorCode = _get('payload.errorCode')
const omitErrorCode = _omit('errorCode')
const isGlobalError = action => getErrorCode(action) < 0
const sleep = time => new Promise(res => setTimeout(res, time * 1000))
const globalErrorAction = createAction(createFailureActionName('connection')('app'))

function forwardErrorToApp(store, { payload, prevAction: { executeWithDelay = 3 } }) {
  store.dispatch(globalErrorAction({
    ...omitErrorCode(payload),
    executeWithDelay
  }))
}

async function repeatAction(store, { prevAction: { executeWithDelay = 3, ...prevAction } }) {
  await sleep(executeWithDelay)
  store.dispatch({
    ...prevAction,
    executeWithDelay: Math.min(executeWithDelay * 2, 60)
  })
}

export const catchErrors = store => next => (action) => {
  if (isGlobalError(action)) {
    forwardErrorToApp(store, action)
    repeatAction(store, action)
  }
  return next(action)
}
