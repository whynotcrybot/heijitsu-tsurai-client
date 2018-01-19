import React from 'react'
import { Flex } from 'reflexbox'

import * as style from './style'

class Surface extends React.Component {
  render () {
    const { children } = this.props

    return (
      <Flex
        className={style.surface}
        w={4/5}
      >
        {children}
      </Flex>
    )
  }
}

export default Surface
