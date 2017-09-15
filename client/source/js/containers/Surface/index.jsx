import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

class Surface extends Component {
  render () {
    const { children } = this.props

    return (
      <div>
        <Flex justify='center'>
          {children}
        </Flex>
      </div>
    )
  }
}

export default Surface
