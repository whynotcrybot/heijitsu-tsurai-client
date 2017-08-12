import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

class Surface extends Component {
  render () {
    const { children } = this.props

    return (
      <div>
        <Flex align='center' justify='center'>
          {children}
        </Flex>
      </div>
    )
  }
}

export default Surface
