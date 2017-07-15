import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { AddBlueprint, DisplayBlueprints } from 'components/Blueprints'
import { fetchBlueprints } from 'ducks/blueprints.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    return (
      <Flex justify='center'>
        <Box w={1 / 3}>
          <h2>Blueprints</h2>
          <AddBlueprint />
          <DisplayBlueprints />
        </Box>
      </Flex>
    )
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    fetchBlueprints: () => dispatch(fetchBlueprints())
  })
)(Home)
