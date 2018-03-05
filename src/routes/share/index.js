const Router = require('koa-router')

const rootRouter = new Router()
const shareRouter = new Router()

module.exports = (app) => {
  require('./createShare').route(shareRouter)
  require('./getShare').route(shareRouter)

  rootRouter.use('/share', shareRouter.routes())
  app.use(rootRouter.routes())
}
