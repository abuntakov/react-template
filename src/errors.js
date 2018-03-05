const i18n = require('./libs/i18n')
const buildError = require('./utils/buildError')

module.exports = {
  INTERNAL_SERVER_ERROR: buildError(1, i18n.__('error.http.internal')),
  RESOURCE_NOT_FOUND: buildError(2, i18n.__('error.http.notFound')),
  UNAUTHORIZED: buildError(3, i18n.__('error.http.unauthorized')),
  USER_ALREADY_EXISTS: username => buildError(4, i18n.__('error.http.user.alreadyExists', username)),
  WRONG_USERNAME_OR_PASSWORD: buildError(5, i18n.__('error.http.user.wrongUsernameOrPassword')),
}
