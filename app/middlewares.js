import _get from 'lodash/fp/get'
import _omit from 'lodash/fp/omit'
import { createAction, createFailureActionName } from './modules/action.helper'

const getErrorCode = _get('payload.errorCode')
const omitErrorCode = _omit('errorCode')
const isGlobalError = action => getErrorCode(action) < 0
const globalErrorAction = createAction(createFailureActionName('connection')('app'))

const actionsQueue = {}

function forwardErrorToApp(store, { payload, prevAction: { executeWithDelay = 3 } }) {
  store.dispatch(globalErrorAction({
    ...omitErrorCode(payload),
    executeWithDelay
  }))
}

async function repeatAction(store, { prevAction: { executeWithDelay = 3, ...prevAction } }) {
  clearTimeout(actionsQueue[prevAction.type])
  const timerId = setTimeout(() => {
    store.dispatch({
      ...prevAction,
      executeWithDelay: Math.min(executeWithDelay * 2, 60)
    })
  }, executeWithDelay * 1000)
  actionsQueue[prevAction.type] = timerId
}

export const catchErrors = store => next => (action) => {
  if (isGlobalError(action)) {
    forwardErrorToApp(store, action)
    repeatAction(store, action)
  }
  return next(action)
}
