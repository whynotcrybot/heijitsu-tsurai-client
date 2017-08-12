import React from 'react'
import { Flex, Box } from 'reflexbox'

import DefaultLayout from 'layouts/Default'
import AddBlueprint from 'components/AddBlueprint'
import Tasks from 'containers/Tasks'

const Home = () => {
  return (
    <DefaultLayout>
      <Box w={1 / 3}>
        <AddBlueprint />
      </Box>
      <Box w={1 / 3}>
        <Tasks />
      </Box>
    </DefaultLayout>
  )
}

export default Home
