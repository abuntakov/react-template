module.exports = () => (
  async function fail(ctx, next) {
    ctx.fail = (error) => {
      ctx.body = error
    }

    await next()
  }
)
