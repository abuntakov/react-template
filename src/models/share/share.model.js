const mongoose = require('libs/mongoose') // eslint-disable-line
const {
  addCrudMethods,
} = require('../crud')

const ShareModule = require('./share.schema')

const ShareSchema = addCrudMethods(ShareModule)

module.exports = mongoose.model('Share', ShareSchema)
