import { createLoadEntitiesLogic } from '../logic.helper'

import * as actionsFn from './actions'

export default [
  createLoadEntitiesLogic('user', actionsFn)
]
