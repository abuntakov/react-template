import L from 'leaflet'
import locationIcon from 'leaflet/dist/images/marker-icon.png'
import location2xIcon from 'leaflet/dist/images/marker-icon-2x.png'
import locationShadowIcon from 'leaflet/dist/images/marker-shadow.png'

export const LocationIcon = L.icon({
  iconUrl: locationIcon,
  iconRetinaUrl: location2xIcon,
  shadowUrl: locationShadowIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
