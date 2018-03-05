const UserRoutes = require('./user')
const OgRoutes = require('./og')

module.exports = (app) => {
  UserRoutes(app)
  OgRoutes(app)
}
