import React from 'react'
import { NavLink } from 'react-router-dom'

const hasChildren = item => !!(item.childRoutes && item.childRoutes.length)

function getAbsolutePath(basePath, path) {
  if (/^\//.test(path)) {
    return path
  }

  if (basePath === '/') {
    return `/${path}`
  }

  return `${basePath}/${path}`
}

export default (items, basePath, classPrefix) => (
  <ul className={`${classPrefix}__list`}>
    {items.filter(item => !item.autoIndexRoute).map((item) => {
      const path = getAbsolutePath(basePath, item.path)

      return (
        <li key={path} className={`${classPrefix}__item`}>
          <NavLink
            to={path}
            className={`${classPrefix}__link`}
            activeClassName={`${classPrefix}__link--active`}
            exact={!hasChildren(item)}
          >
            {item.name || item.path}
          </NavLink>
        </li>
      )
    })}
  </ul>
)
