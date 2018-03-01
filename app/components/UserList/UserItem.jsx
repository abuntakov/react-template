import React from 'react'

export default class UserListItem extends React.PureComponent {
  render() {
    const { user } = this.props

    return (
      <div className="user">
        <i className="icon icon-mode-edit" />
        <div className="user__name">{user.get('name')}</div>
      </div>
    )
  }
}
