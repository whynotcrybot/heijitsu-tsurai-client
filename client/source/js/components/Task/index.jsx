import React, { Component } from 'react'
import { connect } from 'react-redux'

import { completeTask } from 'ducks/tasks.duck'

class Task extends Component {
  render () {
    const { id, title, completed } = this.props

    return (
      <div>
        {
          completed ? (
            <button
              style={{marginRight: '10px'}}>
              Uncomplete
            </button>
          ) : (
            <button
              onClick={() => this.props.completeTask(id)}
              style={{marginRight: '10px'}}>
              Complete
            </button>
          )
        }
        {title}
      </div>
    )
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    completeTask: (id) => dispatch(completeTask(id))
  })
)(Task)
