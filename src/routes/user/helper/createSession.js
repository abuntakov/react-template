module.exports = user => (ctx) => {
  ctx.session = {}
  ctx.session.userId = user._id.toString()
}
