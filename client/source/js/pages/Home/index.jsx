import React from 'react'
import { connect } from 'react-redux'

import DefaultLayout from 'layouts/Default'
import { fetchBlueprints } from 'ducks/blueprints.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    const { blueprints } = this.props
    return (
      <DefaultLayout>
        <h2>Blueprints</h2>
        <ul>
          {blueprints.map(blueprint => <li key={blueprint._id}>{blueprint.title}</li>)}
        </ul>
      </DefaultLayout>
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
