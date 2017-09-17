import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Flex, Box } from 'reflexbox'

import '../../style/index.global.css'
import Routes from './routes'

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <Router>
        <Flex wrap>
          <Box w={1}>
            <Routes />
          </Box>
        </Flex>
      </Router>
    </Provider>
  )
}

export default Root
