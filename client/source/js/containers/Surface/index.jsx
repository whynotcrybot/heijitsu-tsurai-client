import React from 'react'
import { Flex, Box } from 'reflexbox'

class Surface extends React.Component {
  render () {
    const { children } = this.props

    return (
      <Box
        className='surface'
        w={4/5}
        p={2}
      >
        {children}
      </Box>
    )
  }
}

export default Surface
