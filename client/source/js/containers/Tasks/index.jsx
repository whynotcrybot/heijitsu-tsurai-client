import React, { Component } from 'react'
import { connect } from 'react-redux'

import Task from 'components/Task'
import { fetchBlueprints } from 'ducks/blueprints.duck'

class Tasks extends Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    const { tasks } = this.props

    return (
      <div>
        {
          tasks.map(task => (
            <Task
              key={task._id}
              title={task.title} />
          ))
        }
      </div>
    )
  }
}

export default connect(
  function (state) {
    return {
      tasks: state.tasks.tasks
    }
  },
  function (dispatch) {
    return {
      fetchBlueprints: () => dispatch(fetchBlueprints())
    }
  }
)(Tasks)
