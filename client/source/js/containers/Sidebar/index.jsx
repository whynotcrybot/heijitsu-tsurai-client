import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

import * as style from './style'

class Sidebar extends Component {
  render () {
    const { children } = this.props

    return (
      <Box
        className={style.sidebar}
        w={1/5}
        p={2}
      >
        {children}
      </Box>
    )
  }
}

export default Sidebar
