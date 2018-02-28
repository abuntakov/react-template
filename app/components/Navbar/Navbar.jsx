import React from 'react'
import NavbarItem from './NavbarItem'

export default class Navbar extends React.Component {
  render() {
    const { routes, basePath } = this.props

    return (
      <nav className="navbar">
        {NavbarItem(routes, basePath || '', 'navbar')}
      </nav>
    )
  }
}

