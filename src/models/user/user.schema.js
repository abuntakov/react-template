const _ = require('lodash/fp')
const mongoose = require('mongoose')
const i18n = require('libs/i18n') // eslint-disable-line

const {
  emailValidator,
} = require('../validators')

const Role = {
  Admin: 'Admin',
  Manager: 'Manager',
  User: 'User',
}

const roles = _.values(Role)

const Permission = {
  Read: 'Read',
  Write: 'Write',
}

const permissions = _.values(Permission)

const schema = {
  email: {
    type: String,
    trim: true,

    validate: [
      emailValidator,
      {
        type: 'format',
        message: i18n.__('error.validation.format.email'),
      },
    ],
  },

  displayName: {
    type: String,
  },

  role: {
    type: String,
    enum: roles,
    required: true,
  },

  permissions: [{
    type: String,
    enum: permissions,
  }],

}

const schemaKeys = _.keys(schema)

const defaultInsertableFields = _.difference(schemaKeys)([])
const defaultUpdatableFields = ['displayName']

module.exports = {
  defaultInsertableFields,
  defaultUpdatableFields,

  schemaFields: schemaKeys,

  schema: new mongoose.Schema(schema, { timestamps: true })
}
