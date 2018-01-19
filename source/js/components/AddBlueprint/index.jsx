import React from 'react'
import { connect } from 'react-redux'

import { addBlueprint } from 'ducks/blueprints.duck'

const ENTER_KEY = 13

class BlueprintInput extends React.Component {
  handleKeyDown (event) {
    if (event.keyCode == ENTER_KEY) {
      event.preventDefault()

      const title = event.target.value

      if (title) {
        this.props.addBlueprint({title})
      }
    }
  }

  render () {
    return (
      <input
        onKeyDown={this.handleKeyDown.bind(this)}
        autoFocus
      />
    )
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    addBlueprint: (data) => dispatch(addBlueprint(data))
  })
)(BlueprintInput)
