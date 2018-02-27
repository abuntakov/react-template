import React from 'react'
import Navbar from '@app/components/Navbar/Navbar'

function MainLayout({ children, routes }) {
  return (
    <div>
      <Navbar routes={routes} />
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
