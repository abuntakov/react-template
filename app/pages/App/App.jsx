import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _isNil from 'lodash/fp/isNil'

import MainLayout from '@app/components/MainLayout/MainLayout'

import { getNavigationRoutes } from '@app/routeConfig'
import { getLocation } from '@app/modules/app/actions'

class App extends React.Component {
  constructor() {
    super()
    this.navigationRoutes = getNavigationRoutes(ManagedApp) // eslint-disable-line
  }

  componentDidMount() {
    const { actions, location } = this.props

    if (_isNil(location)) {
      actions.getLocation()
    }
  }

  render() {
    const {
      children,

      error,
    } = this.props

    return (
      <MainLayout
        routes={this.navigationRoutes}
        error={error}
      >
        {children}
      </MainLayout>
    )
  }
}


const mapStateToProps = state => ({
  error: state.getIn(['app', 'error'], false),
  location: state.getIn(['app', 'location']),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getLocation,
  }, dispatch),
})


const ManagedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default ManagedApp
