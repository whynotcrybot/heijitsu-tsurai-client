import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { fetchBlueprints } from 'ducks/blueprints.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    const { blueprints } = this.props
    return (
      <Flex justify='center'>
        <Box w={2 / 3}>
          <h2>Blueprints</h2>
          <ul>
            {blueprints.map(blueprint => <li key={blueprint._id}>{blueprint.title}</li>)}
          </ul>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  function (state) {
    return {
      blueprints: state.blueprints.blueprints
    }
  },
  function (dispatch) {
    return {
      fetchBlueprints: () => dispatch(fetchBlueprints())
    }
  }
)(Home)
