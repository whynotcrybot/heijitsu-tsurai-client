import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

class Sidebar extends Component {
  render () {
    const { children } = this.props

    return (
      <Box
        className='sidebar'
        w={1 / 4}
      >
        {children}
      </Box>
    )
  }
}

export default Sidebar
