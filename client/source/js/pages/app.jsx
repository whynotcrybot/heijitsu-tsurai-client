import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Flex, Box } from 'reflexbox'

import '../../style/index.global.css'
import Routes from './routes'

import { fetchBlueprints } from 'ducks/blueprints.duck'

class Root extends React.Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    return (
      <Provider store={this.props.store}>
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
}

export default connect(
  null,
  (dispatch) => ({
    fetchBlueprints: () => dispatch(fetchBlueprints())
  })
)(Root)
