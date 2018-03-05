const _ = require('lodash/fp')

function areIdsEqual(id1, id2) {
  let _id1 = id1
  let _id2 = id2

  if (!_.isNil(id1) && !_.isString(id1)) {
    _id1 = id1.toString()
  }

  if (!_.isNil(id2) && !_.isString(id2)) {
    _id2 = id2.toString()
  }

  return _id1 === _id2
}

module.exports = {
  areIdsEqual,
}

