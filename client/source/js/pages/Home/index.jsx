import React from 'react'
import { Flex, Box } from 'reflexbox'

import { Sidebar, Surface } from 'containers'
import Blueprints from 'containers/Blueprints'
import Tasks from 'containers/Tasks'

const Home = () => {
  return (
    <Flex>
      <Sidebar>
        <Blueprints />
      </Sidebar>
      <Surface>
        <Box w={1}>
          <h2>Tasks</h2>
          <Tasks />
        </Box>
      </Surface>
    </Flex>
  )
}

export default Home
