const ShareModel = require('models/share/share.model')

const creteShare = async (ctx) => {
  const savedShare = await ShareModel.createEntity(ctx.request.body)
  ctx.ok(savedShare)
}

module.exports = {
  route: router => router.post('/create', creteShare),
}
