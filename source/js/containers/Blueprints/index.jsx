import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddBlueprint from 'components/AddBlueprint'
import Blueprint from 'components/Blueprint'

class Blueprints extends Component {
  render () {
    const { blueprints } = this.props

    return (
      <div>
        <AddBlueprint />
        {
          blueprints.map(bp => (
            <Blueprint
              key={bp._id}
              id={bp._id}
              title={bp.title} />
          ))
        }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    blueprints: state.blueprints.blueprints
  })
)(Blueprints)
