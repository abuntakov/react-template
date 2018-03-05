import React from 'react'
import { TileLayer } from 'react-leaflet'

export default () => (
  <TileLayer
    url="https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYXdtY29kZXIiLCJhIjoiY2plZWF6ajhlMXhndDJ4cHJjbTJxemV2aiJ9.fCz3Pr4scQF0Dv2_eafujA"
    attribution="<a href='http://www.mapbox.com/about/maps/' target='_blank'>Terms &amp; Feedback</a>"
  />
)
