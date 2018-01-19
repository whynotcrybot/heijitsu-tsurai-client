import React from 'react'
import { Flex } from 'reflexbox'

import { Sidebar, Surface, Section } from 'containers'
import Blueprints from 'containers/Blueprints'
import Tasks from 'containers/Tasks'

const Home = () => {
  return (
    <Flex>
      <Sidebar>
        <Blueprints />
      </Sidebar>
      <Surface>
        <Section>
          <h2>Tasks</h2>
          <Tasks />
        </Section>
        <Section>
          <h2>Info about currently selected task</h2>
        </Section>
      </Surface>
    </Flex>
  )
}

export default Home
