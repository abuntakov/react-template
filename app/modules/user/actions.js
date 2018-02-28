const actions = {
  LOAD_USERS_REQUEST: 'user/LOAD_USERS_REQUEST',
  LOAD_USERS_SUCCESS: 'user/LOAD_USERS_SUCCESS',
  LOAD_USERS_FAILURE: 'user/LOAD_USERS_FAILURE',
}

export const loadUsers = () => ({
  type: actions.LOAD_USERS_REQUEST,
})

export const loadUsersSuccess = users => ({
  type: actions.LOAD_USERS_SUCCESS,
  payload: users,
})

export const loadUsersFailure = err => ({
  type: actions.LOAD_USERS_FAILURE,
  payload: err,
})

export default actions
