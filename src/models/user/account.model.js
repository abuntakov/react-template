const bcrypt = require('bcryptjs')
const mongoose = require('libs/mongoose')
const {
  createEntity,
  readEntity,
} = require('../crud')

const AccountModule = require('./account.schema')

const AccountSchema = AccountModule.schema

const saltRound = 10

function encryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRound))
}

function checkPassword(password) {
  return bcrypt.compareSync(password, this.password)
}

function preSaveEntity(next) {
  const account = this

  if (account.password) {
    account.password = encryptPassword(account.password)
  }
  next()
}

AccountSchema.methods.encryptPassword = encryptPassword
AccountSchema.methods.checkPassword = checkPassword

AccountSchema.pre('save', preSaveEntity)

AccountSchema.statics.createEntity = createEntity(AccountModule)
AccountSchema.statics.readEntity = readEntity


module.exports = mongoose.model('Account', AccountSchema)
