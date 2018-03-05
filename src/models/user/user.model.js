const mongoose = require('libs/mongoose') // eslint-disable-line
const {
  addCrudMethods,
} = require('../crud')

const UserModule = require('./user.schema')

const UserSchema = addCrudMethods(UserModule)

module.exports = mongoose.model('User', UserSchema)
