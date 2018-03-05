const RootRoutes = require('./root')
const ShareRoutes = require('./share')

module.exports = (app) => {
  RootRoutes(app)
  ShareRoutes(app)
}
