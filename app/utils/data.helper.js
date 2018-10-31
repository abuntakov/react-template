import _keyBy from 'lodash/fp/keyBy'
import _isNil from 'lodash/fp/isNil'

const toMap = _keyBy('id')

export const normalize = items => ({
  result: items.map(i => i.id),
  entities: toMap(items)
})

export const isNotNil = item => !_isNil(item)
