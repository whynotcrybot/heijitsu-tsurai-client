import React, { Component } from 'react'
import { connect } from 'react-redux'

import Task from 'components/Task'
import { fetchBlueprints } from 'ducks/blueprints.duck'

class Tasks extends Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    const { tasks, completed } = this.props

    return (
      <div>
        <p>Today</p>
        {
          tasks.map(task => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title} />
          ))
        }

        <p>Completed</p>
        {
          completed.map(task => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              completed={true} />
          ))
        }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    tasks: state.tasks.tasks,
    completed: state.tasks.completed
  }),
  (dispatch) => ({
      fetchBlueprints: () => dispatch(fetchBlueprints())
  })
)(Tasks)
