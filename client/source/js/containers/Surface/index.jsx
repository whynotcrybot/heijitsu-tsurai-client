import React from 'react'
import { Flex, Box } from 'reflexbox'

class Surface extends React.Component {
  render () {
    const { children } = this.props

    return (
      <Box
        className='surface'
        w={3/4}
      >
        {children}
      </Box>
    )
  }
}

export default Surface
