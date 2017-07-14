import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { fetchBlueprints } from 'ducks/blueprints.duck'

const Home = (props) => {
  props.fetchBlueprints()

  return (
    <Flex justify='center'>
      <Box w={2 / 3}>
        <h2>Home</h2>
      </Box>
    </Flex>
  )
}

export default connect(
  function (state) {
    return {}
  },
  function (dispatch) {
    return {
      fetchBlueprints: () => dispatch(fetchBlueprints())
    }
  }
)(Home)
