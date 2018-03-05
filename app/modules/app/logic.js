import { getLocation } from '@app/utils/geo.helper'

import { createPromiseLogic } from '../logic.helper'
import * as actionsFn from './actions' // eslint-disable-line

export default [
  createPromiseLogic('app', 'getLocation', getLocation)
]
