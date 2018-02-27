import React from 'react'
import renderLinks from './renderLinks'

export default class Navbar extends React.Component {
  render() {
    const { routes, basePath } = this.props

    return (
      <nav className="navbar">
        {renderLinks(routes, basePath || '', 'navbar')}
      </nav>
    )
  }
}

