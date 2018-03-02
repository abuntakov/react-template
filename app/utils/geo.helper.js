/* global navigator */

export const getUserLocation = () => (
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject()

    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
    .then(({ coords: { latitude, longitude } }) => ({
      lat: latitude,
      lng: longitude,
    }))
)
