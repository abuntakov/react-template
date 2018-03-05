const Koa = require('koa')
const config = require('./config')
const morgan = require('koa-morgan')
const session = require('koa-session')
const redisStore = require('koa-redis')
const bodyParser = require('koa-bodyparser')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const ok = require('./middlewares/ok')
const fail = require('./middlewares/fail')
const validator = require('koa-validate')
const views = require('koa-views')

const maxAge = 6 * 30 * 24 * 60 * 60 * 1000

const sessionConfig = {
  key: 'app:session',
  httpOnly: false,
  renew: true,
  maxAge,

  cookie: {
    maxAge,
  },

  store: redisStore({}),
}

const app = new Koa()
app.keys = [config.get('session:secret')]
validator(app)

app.use(morgan('dev'))
app.use(bodyParser())
app.use(session(sessionConfig, app))
app.use(views(`${__dirname}/views`, { extension: 'pug' }))
app.use(ok())
app.use(fail())
app.use(errorHandler())

routes(app)

app.use((ctx) => {
  ctx.status = 404
  ctx.body = 'Page not found'
})

app.listen(3000)
