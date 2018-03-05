const _ = require('lodash/fp')
const errors = require('../errors')
const log = require('../libs/log')(module)

function wrapError(e) {
  if (_.isNil(e) || _.isNil(e.errorCode)) {
    return errors.INTERNAL_SERVER_ERROR
  }

  return e
}

module.exports = () => (
  async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (e) {
      log.debug('handling error: ', e)
      ctx.body = wrapError(e)
    }
  }
)
