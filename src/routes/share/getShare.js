const ShareModel = require('models/share/share.model')
const _isNil = require('lodash/fp/isNil')

const getShare = async (ctx) => {
  const share = await ShareModel.readEntity(ctx.params.sid)
  if (_isNil(share)) {
    return ctx.render('error', { title: 'Not Found' })
  }
  await ctx.render('share', share)
}

module.exports = {
  route: router => router.get('/:sid', getShare),
}
