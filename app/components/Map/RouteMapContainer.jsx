import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { bindActionCreators } from 'redux'
import _pipe from 'lodash/fp/pipe'
import _get from 'lodash/fp/get'
import _maxBy from 'lodash/fp/maxBy'
import _minBy from 'lodash/fp/minBy'

import { DefaultLocation } from '@app/constants'

import DefaultMap from './DefaultMap'

const getMaxLat = _pipe([_maxBy('lat'), _get('lat')])
const getMinLat = _pipe([_minBy('lat'), _get('lat')])
const getMaxLng = _pipe([_maxBy('lng'), _get('lng')])
const getMinLng = _pipe([_minBy('lng'), _get('lng')])


class MapContainer extends React.Component {
  getBounds = positions => ([
    [getMinLat(positions), getMinLng(positions)],
    [getMaxLat(positions), getMaxLng(positions)],
  ])

  render() {
    const { positionFrom, positionTo } = this.props

    const mapProps = {
      zoom: 6,
      center: positionFrom.toJS(),
      boundsOptions: {
        paddingTopLeft: [0, 240],
      }
    }

    const positions = [mapProps.center, positionTo.toJS()]
    mapProps.bounds = this.getBounds(positions)

    return (
      <DefaultMap
        mapProps={mapProps}
        positions={positions}
      />
    )
  }
}

const mapStateToProps = state => ({
  positionFrom: state.getIn(['app', 'location', 'position'], Map(DefaultLocation.position)),
  positionTo: Map({ lat: 37.983810, lng: 23.727539 })
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapContainer)
