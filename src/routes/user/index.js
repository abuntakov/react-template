const Router = require('koa-router')

const userRouter = new Router()

const rootRouter = new Router()

module.exports = (app) => {
  require('./checkAuth').route(userRouter)
  require('./signUp').route(userRouter)
  require('./signIn').route(userRouter)

  rootRouter.use('/api/v1/user', userRouter.routes())
  app.use(rootRouter.routes())
}
