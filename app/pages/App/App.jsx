import React from 'react'
import { connect } from 'react-redux'

import MainLayout from '@app/components/MainLayout/MainLayout'

import { getNavigationRoutes } from '@app/routeConfig'

class App extends React.Component {
  constructor() {
    super()
    this.navigationRoutes = getNavigationRoutes(ManagedApp) // eslint-disable-line
  }

  render() {
    const {
      location,
      children,
    } = this.props

    return (
      <MainLayout location={location} routes={this.navigationRoutes}>
        {children}
      </MainLayout>
    )
  }
}

const mapStateToProps = state => ({
  location: state.getIn(['router', 'locationBeforeTransitions'], {}),
})

const ManagedApp = connect(
  mapStateToProps,
)(App)

export default ManagedApp
