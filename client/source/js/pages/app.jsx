import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '../../style/normalize.css'
import '../../style/global.css'

import Routes from './routes'

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  )
}

export default Root
