import React from 'react'
import { Box } from 'reflexbox'

class Section extends React.Component {
  render () {
    const { children } = this.props

    return (
      <Box
        className='section'
        w={1}
      >
        {children}
      </Box>
    )
  }
}

export default Section
