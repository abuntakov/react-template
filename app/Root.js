import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import history from './history'

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
      children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
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
    console.log(this.props.routeConfig)
    const children = renderRouteConfigV3(null, this.props.routeConfig, '/')
    console.log(children, history)
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </Provider>
    )
  }
}

