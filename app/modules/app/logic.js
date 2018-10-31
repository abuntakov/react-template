import { getUserPosition, resolveLocationByPosition } from '@app/utils/geo'

import { createPromiseLogic } from '../logic.helper'

export default [
  createPromiseLogic(
    'appLocation',
    'get',
    () => getUserPosition().then(resolveLocationByPosition()),
  )
]
