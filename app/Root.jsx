import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'
import history from './history'

const getComponentRoute = (contextPath, component) => (
  <Route
    key={contextPath}
    component={component}
    path={contextPath}
    exact
  />
)

function renderRouteConfigV3(Container, routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []

  const renderRoute = (item, routeContextPath) => {
    let newContextPath
    if (/^\//.test(item.path)) {
      newContextPath = item.path
    } else {
      newContextPath = `${routeContextPath}/${item.path}`
    }
    newContextPath = newContextPath.replace(/\/+/g, '/')
    if (item.redirect) {
      children.push(<Route key={newContextPath} render={() => <Redirect to={item.redirect} />} path={newContextPath} exact />)
    } else if (item.component && item.childRoutes) {
      children.push(renderRouteConfigV3(item.component, item.childRoutes, newContextPath))
    } else if (item.component) {
      children.push(getComponentRoute(newContextPath, item.component))
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    }
  }

  routes.forEach(item => renderRoute(item, contextPath))

  // Use Switch as the default container by default
  if (!Container) return <Switch>{children}</Switch>

  return (
    <Container key={contextPath}>
      <Switch>
        {children}
      </Switch>
    </Container>
  )
}

export default class Root extends React.Component {
  render() {
    const { store, routeConfig } = this.props
    const children = renderRouteConfigV3(null, routeConfig, '/')

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </Provider>
    )
  }
}
