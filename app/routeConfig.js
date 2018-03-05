import App from './pages/App/App'
import PageNotFound from './pages/Error/PageNotFound'

import HomeRoute from './pages/Home/route'
import UsersRoute from './pages/Users/route'
import MapRoute from './pages/Map/route'

const childRoutes = [
  HomeRoute,
  UsersRoute,
  MapRoute,
]

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.redirect || r.component || (r.childRoutes && r.childRoutes.length > 0)),
}]

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = route.path
    first.exact = true
    first.autoIndexRoute = true // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first)
  }
  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)
export default routes

export const getNavigationRoutes = (Component) => {
  const { childRoutes } = routes.find(r => r.component === Component)
  return childRoutes.filter(r => !r.path.endsWith('*') && !r.redirect)
}

export const getSubNavigationRoutes = (routes, path) => {
  const route = routes
    .sort((b, a) => a.path.length - b.path.length)
    .find(r => path.startsWith(r.path))

  return route || {}
}
