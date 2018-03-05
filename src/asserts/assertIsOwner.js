const _ = require('lodash/fp')

const assertIsOwner = (userId, error) => (obj) => {
  if (_.toString(obj.userId) !== userId) {
    throw error
  }

  return obj
}

module.exports = assertIsOwner
