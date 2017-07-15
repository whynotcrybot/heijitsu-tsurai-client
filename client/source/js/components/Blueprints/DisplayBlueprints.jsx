import React from 'react'
import { connect } from 'react-redux'

import * as styles from './styles.css'

const DisplayBlueprints = ({blueprints}) => {
  return (
    <div className={styles.blueprintsWrapper}>
      {
        blueprints.map(blueprint => {
          return (
            <div
              key={blueprint._id}
              className={styles.blueprint}
            >
              {blueprint.title}
            </div>
          )
        })
      }
    </div>
  )
}

export default connect(
  (state) => ({
    blueprints: state.blueprints.blueprints
  })
)(DisplayBlueprints)
