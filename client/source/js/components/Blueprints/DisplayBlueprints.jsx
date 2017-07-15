import React from 'react'
import { connect } from 'react-redux'

const DisplayBlueprints = ({blueprints}) => {
  return (
    <ul>
      {blueprints.map(blueprint => <li key={blueprint._id}>{blueprint.title}</li>)}
    </ul>
  )
}

export default connect(
  (state) => ({
    blueprints: state.blueprints.blueprints
  })
)(DisplayBlueprints)
