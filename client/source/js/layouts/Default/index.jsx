import React, { Component } from 'react'

import Navigation from 'containers/Navigation'
import Surface from 'containers/Surface'

class DefaultLayout extends Component {
  render () {
    const { children } = this.props

    return (
      <div>
        <Navigation.Wrapper>
          <Navigation.Item to={'/'}>Home</Navigation.Item>
          <Navigation.Item to={'/about'}>About</Navigation.Item>
        </Navigation.Wrapper>
        <Surface>
          {children}
        </Surface>
      </div>
    )
  }
}

export default DefaultLayout
