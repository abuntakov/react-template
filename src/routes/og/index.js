const Router = require('koa-router')

const rootRouter = new Router()

module.exports = (app) => {
  rootRouter.get('/share', async (ctx) => {
    await ctx.render('share', {
      title: 'Мэрилин Монро',
      description: 'Американская киноактриса и певица',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Marilyn_Monroe_-_publicity.JPG/210px-Marilyn_Monroe_-_publicity.JPG',
      url: 'https://ru.wikipedia.org/wiki/Мэрилин_Монро',
    })
  })
  rootRouter.get('/', async (ctx) => {
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  })
  app.use(rootRouter.routes())
}
