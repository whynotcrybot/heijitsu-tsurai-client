import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

class Surface extends Component {
  render () {
    const { children } = this.props

    return (
      <div>
        <Flex justify='center'>
          <Box w={2 / 3}>
            {children}
          </Box>
        </Flex>
      </div>
    )
  }
}

export default Surface
