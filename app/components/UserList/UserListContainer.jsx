import _isNil from 'lodash/fp/isNil'
import React from 'react'
import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadUsers } from '@app/modules/user/actions'

import UserItem from './UserItemContainer'

class RelationTableContainer extends React.Component {
  componentDidMount() {
    const { loadedAt, actions } = this.props

    if (_isNil(loadedAt)) {
      actions.loadUsers()
    }
  }

  render() {
    const { userIds } = this.props

    return (
      <ul className="users__list">
        {userIds.map(id => <UserItem id={id} key={id} />)}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  userIds: state.getIn(['user', 'result'], List()),
  loadedAt: state.getIn(['user', 'loadedAt']),
  loading: state.getIn(['user', 'loading']),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadUsers,
  }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelationTableContainer)
