import actions, { loadUsersFailure, loadUsersSuccess } from '@app/modules/user/actions'
import * as routes from '@app/apiRoutes'
import { createLogic } from 'redux-logic'
import _compose from 'lodash/fp/compose'

export const loadUsersLogic = createLogic({
  type: actions.LOAD_USERS_REQUEST,

  process({ httpClient }, dispatch, done) {
    httpClient(routes.loadUsers())
      .then(_compose(dispatch, loadUsersSuccess))
      .catch(_compose(dispatch, loadUsersFailure))
      .then(() => done())
  },
})


export default [
  loadUsersLogic
]
