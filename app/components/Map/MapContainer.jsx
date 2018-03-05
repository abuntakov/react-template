import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class MapContainer extends React.Component {
  render() {
    return null
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
