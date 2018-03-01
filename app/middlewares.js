import _get from 'lodash/fp/get'

const getErrorCode = _get('payload.errorCode')

export const catchErrors = store => next => (action) => {
  if (getErrorCode(action) < 0) {
    store.dispatch({
      type: 'LOL'
    })
  }
  return next(action)
}
