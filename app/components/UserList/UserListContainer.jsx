import _isNil from 'lodash/fp/isNil'
import React from 'react'
import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadUsers } from '@app/modules/user/actions'

import Loading from '@app/components/Loading/LoadingComponent'
import ComponentError from '@app/components/Errors/ComponentError'

import UserItem from './UserItemContainer'

class UserListContainer extends React.Component {
  componentDidMount() {
    const { loadedAt, actions } = this.props

    if (_isNil(loadedAt)) {
      actions.loadUsers()
    }
  }

  render() {
    const { userIds, loading, error } = this.props

    if (loading) {
      return (
        <Loading />
      )
    }

    return (
      <div>
        <ul className="users__list">
          <For each="id" of={userIds}>
            <UserItem id={id} key={id} />
          </For>
        </ul>
        <If condition={error}>
          <ComponentError message={error} />
        </If>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userIds: state.getIn(['user', 'result'], List()),
  loadedAt: state.getIn(['user', 'loadedAt']),
  loading: state.getIn(['user', 'loading']),
  error: state.getIn(['user', 'error']),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadUsers,
  }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListContainer)
