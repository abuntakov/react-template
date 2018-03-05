const _ = require('lodash/fp')

module.exports = function assertNotNull(obj, error) {
  if (_.isNil(obj)) {
    throw error
  }

  return obj
}
