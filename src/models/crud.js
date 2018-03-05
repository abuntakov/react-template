const _ = require('lodash/fp')
const mongoose = require('../libs/mongoose')

function createEntity(defaultFields) {
  return function _createEntity(entity, { fields } = { fields: defaultFields }) {
    const Entity = this
    const filtredEntity = _.pick(fields)(entity)
    return new Entity(filtredEntity).save()
  }
}

function updateEntity(defaultFields) {
  return async function _updateEntity(id, entity, attr = {}) {
    const fields = attr.fields || defaultFields
    const asserts = attr.asserts || []
    const extraConditions = attr.extraConditions || {}
    const updateConditions = attr.updateConditions || {}

    const Entity = this

    const conditions = _.assign({ _id: id })(extraConditions)

    const persistentOrder = await Entity.findOne(conditions)

    if (_.isNil(persistentOrder)) {
      return null
    }

    if (!_.isEmpty(asserts)) {
      _.each(assert => assert(persistentOrder))(asserts)
    }

    const options = { new: true, runValidators: true }
    const update = {
      $set: _.pick(fields)(entity),
      $inc: { __v: 1 },
    }

    const conditionsWithUpdate = _.assign(conditions)(updateConditions)
    const conditionsWithVersion = _.assign({ __v: entity.__v })(conditionsWithUpdate)

    const resultEntity = await Entity
      .findOneAndUpdate(conditionsWithVersion, update, options)
      .then((savedEntity) => {
        if (_.isNil(savedEntity)) {
          throw new mongoose.Error.VersionError({ objectId: id })
        }

        return savedEntity
      })

    return resultEntity
  }
}

function readEntity(id) {
  const Entity = this

  const condition = {
    _id: id,
  }

  return Entity.findOne(condition)
}

function addCrudMethods(schemaModule) {
  const {
    defaultInsertableFields,
    defaultUpdatableFields,
  } = schemaModule

  const EntitySchema = schemaModule.schema

  EntitySchema.statics.createEntity = createEntity(defaultInsertableFields)
  EntitySchema.statics.updateEntity = updateEntity(defaultUpdatableFields)
  EntitySchema.statics.readEntity = readEntity

  return EntitySchema
}

module.exports = {
  addCrudMethods,
  readEntity,

  createEntity: (schemaModule, fields) => {
    const { defaultInsertableFields } = schemaModule
    return createEntity(fields || defaultInsertableFields)
  },

  updateEntity: (schemaModule, fields) => {
    const { defaultUpdatableFields } = schemaModule
    return updateEntity(fields || defaultUpdatableFields)
  },
}
