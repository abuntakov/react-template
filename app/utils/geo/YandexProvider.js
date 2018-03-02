import axios from 'axios'

export const HOUSE_KIND = 'house'

export const isHouseLocation = ({ kind }) => kind === HOUSE_KIND

function getAddress(response) {
  const { Address, kind } = response
    .GeoObjectCollection
    .featureMember[0]
    .GeoObject
    .metaDataProperty
    .GeocoderMetaData

  const address = {}
  Address.Components.forEach((el) => {
    address[el.kind] = el.name
  })

  return {
    address: {
      city: address.locality || '',
      street: address.street || '',
      number: address.house || '',
    },

    kind,
  }
}

function getLocation(response) {
  const geoObj = response
    .GeoObjectCollection
    .featureMember[0]
    .GeoObject

  const position = geoObj.Point
    .pos
    .split(' ')

  const lat = position[1]
  const lng = position[0]

  const { kind } = geoObj
    .metaDataProperty
    .GeocoderMetaData


  if (!lat || !lng) {
    return {}
  }

  return {
    location: {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    },

    kind,
  }
}

export const resolveAddress = async ({ lat, lng }) => {
  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&results=1&geocode=${lng},${lat}`
  const res = await axios.get(url, { withCredentials: false })
  return getAddress(res.data.response)
}

export async function resolveLocation({
  country,
  city,
  street,
  building,
  number,
  addressLine,
}) {
  let url = `https://geocode-maps.yandex.ru/1.x/?format=json&results=1&geocode=${country}, `
  if (city) {
    url += `${city}, `

    if (addressLine) {
      url += `${addressLine}`
    } else if (street) {
      url += `${street}, дом `
      if (number) {
        url += number

        if (building) {
          url += `, корпус ${building}`
        }
      }
    }
  }

  url = url.split(' ').join('+')
  try {
    const { data } = await axios.get(url, { withCredentials: false })
    const addressResult = getAddress(data.response)
    const locationResult = getLocation(data.response)

    return { ...addressResult, ...locationResult }
  } catch (e) {
    return {}
  }
}
