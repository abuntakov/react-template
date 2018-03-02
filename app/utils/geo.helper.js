/* global navigator */

export function getLocation() {
  return new Promise((res) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => res({ lat, lng }),
        () => res(null)
      )
    } else {
      res(null)
    }
  })
}
