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
      children,
    } = this.props

    return (
      <MainLayout routes={this.navigationRoutes}>
        {children}
      </MainLayout>
    )
  }
}

const mapStateToProps = () => ({})

const ManagedApp = connect(
  mapStateToProps,
)(App)

export default ManagedApp
