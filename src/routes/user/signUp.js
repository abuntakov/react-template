const AccountModel = require('../../models/user/account.model')
const UserModel = require('../../models/user/user.model')

const errors = require('../../errors')

const createSession = require('./helper/createSession')

const signUp = async (ctx) => {
  const { username, password, ...user } = ctx.request.body

  const foundAccount = await AccountModel
    .findOne({ username })

  if (foundAccount) {
    throw errors.USER_ALREADY_EXISTS(username)
  }

  const savedUser = await UserModel.createEntity(user)

  const account = {
    username,
    password,
    userId: savedUser._id,
  }

  await AccountModel.createEntity(account)

  createSession(savedUser)(ctx)

  ctx.ok(savedUser)
}

module.exports = {
  route: router => router.post('/signUp', signUp),
}

