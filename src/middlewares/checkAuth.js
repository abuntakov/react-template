const assertNotNull = require('../asserts/assertNotNull')
const errors = require('../errors')

module.exports = async function checkAuth(ctx, next) {
  assertNotNull(ctx.session.userId, errors.UNAUTHORIZED)

  await next()
}
