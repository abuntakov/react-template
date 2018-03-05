const Router = require('koa-router')

const ShareModel = require('models/share/share.model')
const assertNotNull = require('asserts/assertNotNull')

const rootRouter = new Router()
const shareRouter = new Router()

module.exports = (app) => {
  shareRouter.post('/create', async (ctx) => {
    const savedShare = await ShareModel.createEntity(ctx.request.body)
    ctx.ok(savedShare)
  })

  shareRouter.get('/:sid', async (ctx) => {
    const shareId = ctx.params.sid
    assertNotNull(shareId)

    const share = await ShareModel.readEntity(shareId)
    assertNotNull(share)

    await ctx.render('share', share)
  })

  rootRouter.use('/share', shareRouter.routes())
  app.use(rootRouter.routes())
}
