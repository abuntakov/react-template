module.exports = () => (
  async function ok(ctx, next) {
    ctx.ok = (data) => {
      ctx.body = {
        errorCode: 0,
        errorMessage: null,
        result: data,
      }
    }

    await next()
  }
)
