const Router = require('koa-router')

const rootRouter = new Router()

module.exports = (app) => {
  rootRouter.get('/:id', async (ctx) => {
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  })

  app.use(rootRouter.routes())
}
