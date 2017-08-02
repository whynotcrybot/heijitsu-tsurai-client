import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

class Surface extends Component {
  scrollTo () {
    this.surface.scrollIntoView()
    console.log('scrolled')
  }

  render () {
    const { children } = this.props

    return (
      <div ref={ref => (this.surface = ref)}>
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
