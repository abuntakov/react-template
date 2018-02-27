import React from 'react'
import l10n from '@locale/strings_ru'

import UserList from '@app/components/UserList/UserListContainer'

export default class Users extends React.Component {
  render() {
    return (
      <div className="page">
        <h2>{l10n.users_page__header}</h2>
        <UserList />
      </div>
    )
  }
}
