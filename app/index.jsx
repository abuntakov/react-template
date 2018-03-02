import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import moment from 'moment'
import 'moment/locale/ru'

import logger from './utils/logger'
import { getUserLocation } from './utils/geo.helper'

import configStore from './configStore'
import routeConfig from './routeConfig'
import Root from './Root'

moment.locale('ru')

const store = configStore()

function renderApp(app) {
  render(
    <AppContainer>
      {app}
    </AppContainer>,
    document.getElementById('react-root')
  )
}

renderApp(<Root store={store} routeConfig={routeConfig} />)

getUserLocation()
  .then(location => logger.info('Resolve user location', location))
  .catch(error => logger.error('Cannot resolve user location', error))

if (module.hot) {
  module.hot.accept('./routeConfig', () => {
    const nextRouteConfig = require('./routeConfig').default // eslint-disable-line
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />)
  })
}
