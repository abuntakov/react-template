const AccountModel = require('../../models/user/account.model')
const UserModel = require('../../models/user/user.model')
const assertNotNull = require('../../asserts/assertNotNull')
const errors = require('../../errors')

const createSession = require('./helper/createSession')

const signIn = async (ctx) => {
  const { username, password } = ctx.request.body

  const foundAccount = await AccountModel
    .findOne({ username })

  assertNotNull(foundAccount, errors.WRONG_USERNAME_OR_PASSWORD)

  if (!foundAccount.checkPassword(password)) {
    throw errors.WRONG_USERNAME_OR_PASSWORD
  }

  const savedUser = await UserModel.findOne({ _id: foundAccount.userId })

  assertNotNull(foundAccount, errors.INTERNAL_SERVER_ERROR)

  createSession(savedUser)(ctx)

  ctx.ok(savedUser)
}

module.exports = {
  route: router => router.post('/signIn', signIn),
}

