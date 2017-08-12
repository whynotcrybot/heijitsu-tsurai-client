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
        {
          tasks.map(task => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title} />
          ))
        }
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
    tasks: state.tasks.tasks.filter(task => !task.completed),
    completed: state.tasks.tasks.filter(task => task.completed),
  }),
  (dispatch) => ({
      fetchBlueprints: () => dispatch(fetchBlueprints())
  })
)(Tasks)
