import React, { Component } from 'react'

class Task extends Component {
  render () {
    const { title } = this.props

    return (
      <div>
        <button>Complete</button>
        <button style={{marginRight: '10px'}}>Delete</button>
        {title}
      </div>
    )
  }
}

export default Task
