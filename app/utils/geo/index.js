/* global navigator */
import _isArray from 'lodash/fp/isArray'
import _isObject from 'lodash/fp/isObject'
import _isNil from 'lodash/fp/isNil'

import * as YandexProvider from './YandexProvider'

export const getUserPosition = () => (
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject()

    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
    .then(({ coords: { latitude, longitude } }) => ({
      lat: latitude,
      lng: longitude,
    }))
)

export const resolveLocationByPosition = ({ provider } = { provider: 'yandex' }) => async (position) => {
  if (provider === 'yandex') {
    return YandexProvider.resolveLocationByPosition(position)
  }

  return {}
}

export const resolveLocationByAddress = ({ provider } = { provider: 'yandex' }) => async (address) => {
  if (provider === 'yandex') {
    return YandexProvider.resolveLocationByAddress(address)
  }

  return {}
}

function normalizePoint(point) {
  if (_isNil(point)) {
    return {}
  }

  if (_isArray(point)) {
    return { lat: point[1], lng: point[0] }
  }

  if (_isObject(point)) {
    return { lat: point.lat, lng: point.lng }
  }

  return {}
}

function latLngToXY(arr) {
  const [y, x] = arr
  return [x, y]
}

function polygonLatLngToXY(polygon) {
  return polygon.map(path => path.map(latLngToXY))
}

export function isPolygonContainsPoint(polygon, point) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  const { lat, lng } = normalizePoint(point)
  const x = lng
  const y = lat

  const vs = polygonLatLngToXY(polygon)[0]

  let inside = false
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) { // eslint-disable-line
    const xi = vs[i][0]
    const yi = vs[i][1]
    const xj = vs[j][0]
    const yj = vs[j][1]

    const intersect = ((yi > y) !== (yj > y)) // eslint-disable-line
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi) // eslint-disable-line
    if (intersect) inside = !inside
  }

  return inside
}
