import React from 'react'
import { connect } from 'react-redux'

import UserItem from './UserItem'

class UserItemContainer extends React.Component {
  render() {
    const { user } = this.props

    if (!user) {
      return null
    }

    return (
      <UserItem user={user} />
    )
  }
}

const mapStateToProps = (state, { id }) => ({
  user: state.getIn(['user', 'entities', String(id)]),
})


export default connect(
  mapStateToProps,
)(UserItemContainer)
