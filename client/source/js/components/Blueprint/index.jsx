import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deleteBlueprint } from 'ducks/blueprints.duck'

class Blueprint extends Component {
  render () {
    const { id, title } = this.props

    return (
      <div>
        <button
          onClick={() => this.props.deleteBlueprint(id)}
          style={{marginRight: '10px'}}>
          Delete
        </button>
        {title}
      </div>
    )
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    deleteBlueprint: (id) => dispatch(deleteBlueprint(id))
  })
)(Blueprint)
