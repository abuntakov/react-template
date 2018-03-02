import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import moment from 'moment'
import 'moment/locale/ru'

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

if (module.hot) {
  module.hot.accept('./routeConfig', () => {
    const nextRouteConfig = require('./routeConfig').default // eslint-disable-line
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />)
  })
}
