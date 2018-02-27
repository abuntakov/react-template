import React from 'react'

export default class UserListItem extends React.PureComponent {
  render() {
    const { user } = this.props

    return (
      <div className="user">
        <div className="user__name">{user.get('name')}</div>
      </div>
    )
  }
}
