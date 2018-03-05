const injectUser = require('../../middlewares/injectUser')
const { hasSession } = require('../../utils/session')
const errors = require('../../errors')

const checkAuth = (ctx) => {
  if (!hasSession(ctx)) {
    return ctx.fail(errors.UNAUTHORIZED)
  }

  return ctx.ok(ctx.user)
}

module.exports = {
  route: router => router.get('/checkAuth', injectUser, checkAuth),
}

