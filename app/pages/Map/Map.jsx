import React from 'react'
import l10n from '@locale/strings_ru'

import RouteMap from '@app/components/Map/RouteMapContainer'

import './Map.scss'

export default class MapPage extends React.Component {
  render() {
    return (
      <div className="page">
        <h2>{l10n.map_page__header}</h2>
        <div className="route-map-container route-map-container--fullscreen">
          <RouteMap />
        </div>
      </div>
    )
  }
}
