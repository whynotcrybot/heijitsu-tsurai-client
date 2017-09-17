import React from 'react'
import { Flex, Box } from 'reflexbox'

import DefaultLayout from 'layouts/Default'
import Blueprints from 'containers/Blueprints'
import Tasks from 'containers/Tasks'

const Home = () => {
  return (
    <DefaultLayout>
      <Box w={1 / 3}>
        <h2>Blueprints</h2>
        <Blueprints />
      </Box>
      <Box w={1 / 3}>
        <h2>Tasks</h2>
        <Tasks />
      </Box>
    </DefaultLayout>
  )
}

export default Home
