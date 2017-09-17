import React, { Component } from 'react'

import Surface from 'containers/Surface'

class DefaultLayout extends Component {
  render () {
    const { children } = this.props

    return (
      <div>
        <Surface>
          {children}
        </Surface>
      </div>
    )
  }
}

export default DefaultLayout
