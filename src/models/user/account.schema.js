const _ = require('lodash/fp')
const mongoose = require('mongoose')
const i18n = require('libs/i18n') // eslint-disable-line

const schema = {
  username: {
    type: String,
    required: [
      true,
      i18n.__('error.validation.required.username'),
    ],
  },

  password: {
    type: String,
    required: [
      true,
      i18n.__('error.validation.required.password'),
    ],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

    required: [
      true,
      i18n.__('error.validation.required.userId'),
    ],
  },
}

const schemaKeys = _.keys(schema)

const defaultInsertableFields = _.difference(schemaKeys)([])
const defaultUpdatableFields = []

module.exports = {
  defaultInsertableFields,
  defaultUpdatableFields,

  schema: new mongoose.Schema(schema, { timestamps: true }),
}
