import React from 'react'
import { Map, Marker, Polyline } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import logger from '@app/utils/logger'

import OpenStreetMapTileLayer from '@app/components/TileLayers/OpenStreetMapTileLayer'

import { LocationIcon } from './markers'

const getMarkerKey = (position, index = 0) => (
  `marker-${index}-${position.lat}-${position.lng}`
)

export default class DefaultMap extends React.Component {
  render() {
    const {
      mapProps,
      positions,
      TileLayer = OpenStreetMapTileLayer
    } = this.props

    logger.debug('Render default map', mapProps)

    return (
      <Map {...mapProps}>
        <TileLayer />
        <Polyline positions={positions} />
        <For each="position" index="idx" of={positions}>
          <Marker
            position={position}
            key={getMarkerKey(position, idx)}
            icon={LocationIcon}
          />
        </For>
      </Map>
    )
  }
}
