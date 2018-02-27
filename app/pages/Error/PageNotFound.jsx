import React from 'react'
import l10n from '@locale/strings_ru'

export default class PageNotFound extends React.Component {
  render() {
    return (
      <div>{l10n.not_found_page__header}</div>
    )
  }
}
