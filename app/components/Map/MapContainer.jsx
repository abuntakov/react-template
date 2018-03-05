import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class MapContainer extends React.Component {
  render() {
    const { location } = this.props
    return (
      <div>Your location is {JSON.stringify(location)}</div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.getIn(['app', 'location'])
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapContainer)
