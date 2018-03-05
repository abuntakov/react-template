import React from 'react'
import l10n from '@locale/strings_ru'

import Map from '@app/components/Map/MapContainer'

export default class MapPage extends React.Component {
  render() {
    return (
      <div className="page">
        <h2>{l10n.map_page__header}</h2>
        <Map />
      </div>
    )
  }
}
