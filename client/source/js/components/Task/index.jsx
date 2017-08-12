import React, { Component } from 'react'
import { connect } from 'react-redux'

import { complete, uncomplete } from 'ducks/tasks.duck'

class Task extends Component {
  render () {
    const { id, title, completed } = this.props

    return (
      <div>
        {
          completed ? (
            <button
              onClick={() => this.props.uncomplete(id)}
              style={{marginRight: '10px'}}>
              Uncomplete
            </button>
          ) : (
            <button
              onClick={() => this.props.complete(id)}
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
    complete: (id) => dispatch(complete(id)),
    uncomplete: (id) => dispatch(uncomplete(id)),
  })
)(Task)
