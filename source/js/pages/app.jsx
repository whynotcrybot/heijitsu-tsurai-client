import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '../../style/normalize.css'
import '../../style/global.css'

import Routes from './routes'

import { fetchBlueprints } from 'ducks/blueprints.duck'

class Root extends React.Component {
  componentDidMount () {
    this.props.fetchBlueprints()
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    fetchBlueprints: () => dispatch(fetchBlueprints())
  })
)(Root)
