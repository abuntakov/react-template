const { hasSession } = require('../utils/session')
const UserModel = require('../models/user/user.model')
const log = require('../libs/log')(module)

module.exports = async (ctx, next) => {
  if (hasSession(ctx)) {
    const userId = ctx.user.id
    const user = await UserModel.readEntity(userId)

    if (!user) {
      log.warn(`User [${userId}] has session, but not found in db`)
      await ctx.session.destroy()
      delete ctx.user
    } else {
      ctx.user = { ...user.toObject(), id: userId }
    }
  }

  await next()
}
