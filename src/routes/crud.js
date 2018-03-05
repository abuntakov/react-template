const assertNotNull = require('../asserts/assertNotNull')

function createEntity(EntityModel, attr = {}) {
  const entityName = attr.entityName || 'entity'

  return async function _createEntity(ctx) {
    const entity = await EntityModel
      .createEntity(ctx.request.body)

    ctx.ok({ [entityName]: entity })
  }
}

function updateEntity(EntityModel, attr = {}) {
  const entityName = attr.entityName || 'entity'

  return async function _createEntity(ctx) {
    const entityId = ctx.params.id
    const entity = await EntityModel
      .updateEntity(entityId, ctx.request.body)
      .then(assertNotNull)

    ctx.ok({ [entityName]: entity })
  }
}

function readEntity(EntityModel, attr = {}) {
  const entityName = attr.entityName || 'entity'

  return async function _readEntity(ctx) {
    const entityId = ctx.params.id
    const entity = await EntityModel
      .readEntity(entityId)
      .then(assertNotNull)

    ctx.ok({ [entityName]: entity })
  }
}

module.exports = {
  createEntity,
  updateEntity,
  readEntity,
}
