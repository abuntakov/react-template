import { getUserPosition, resolveLocationByPosition } from '@app/utils/geo'

import { createPromiseLogic } from '../logic.helper'
import * as actionsFn from './actions' // eslint-disable-line

export default [
  createPromiseLogic(
    'appLocation',
    'get',
    getUserPosition().then(resolveLocationByPosition()),
  )
]
