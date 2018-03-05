const _ = require('lodash/fp')
const mongoose = require('mongoose')
const i18n = require('libs/i18n') // eslint-disable-line

const schema = {
  title: String,
  description: String,
  image: String,
  url: String,
  queryId: String,
  state: {},
}

const schemaKeys = _.keys(schema)

const defaultInsertableFields = _.difference(schemaKeys)([])
const defaultUpdatableFields = ['title']

module.exports = {
  defaultInsertableFields,
  defaultUpdatableFields,

  schemaFields: schemaKeys,

  schema: new mongoose.Schema(schema, { timestamps: true })
}
