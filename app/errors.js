export const SERVER_ERROR = -1
export const NO_CONNECTION = -2

const HTTP_ERROR_MESSAGES = {
  502: 'Bad Gateway',
  404: 'Not Found',
  undefined: 'Check your internet connection!',
}

export function buildError(err) {
  return {
    errorCode: err.response.status ? SERVER_ERROR : NO_CONNECTION,
    errorMessage: HTTP_ERROR_MESSAGES[err.response.status]
  }
}
