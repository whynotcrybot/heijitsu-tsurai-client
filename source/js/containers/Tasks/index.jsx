import React, { Component } from 'react'
import { connect } from 'react-redux'

import Task from 'components/Task'

class Tasks extends Component {
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
  })
)(Tasks)
