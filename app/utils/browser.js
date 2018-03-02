/* global navigator */

export function getLocation() {
  return new Promise((res) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res, () => res(null))
    } else {
      res(null)
    }
  })
}
