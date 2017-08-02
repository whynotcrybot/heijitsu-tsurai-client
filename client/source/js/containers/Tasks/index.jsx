import React, { Component } from 'react'
import { connect } from 'react-redux'

import Task from 'components/Task'
import { fetchBlueprints } from 'ducks/blueprints.duck'

class Tasks extends Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    const { blueprints } = this.props

    return (
      <div>
        {
          blueprints.map(blueprint => (
            <Task
              key={blueprint._id}
              title={blueprint.title} />
          ))
        }
      </div>
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
)(Tasks)
