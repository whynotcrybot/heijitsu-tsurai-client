import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deleteBlueprint } from 'ducks/blueprints.duck'

import * as style from './style'

class Blueprint extends Component {
  render () {
    const { id, title } = this.props

    return (
      <div
        className={style.blueprint}
      >
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
