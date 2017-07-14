import React from 'react'

import { Flex, Box } from 'reflexbox'
import cat from 'img/cat.jpg'

const Neko = () => {
  return (
    <Flex justify='center'>
      <Box w={2 / 3}>
        <h2>Neko</h2>
        <img width='512px' src={cat} alt='' />
      </Box>
    </Flex>
  )
}

export default Neko
