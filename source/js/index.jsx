import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import { createLogger } from 'redux-logger'
import rootReducer from './ducks'
import App from './pages/app'

// Store
const middleware = [
  apiMiddleware,
  thunkMiddleware
].concat(process.env.IS_DEV ? [createLogger({collapsed: true})] : [])

const enhancer = compose(
  applyMiddleware(...middleware)
)

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./ducks').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}

const store = configureStore({})

// Render
function renderApp (RootComponent) {
  ReactDOM.render(
    <RootComponent
      store={store}
    />,
    document.getElementById('root')
  )
}

renderApp(App)

// necessary to enable hot reloading of functions that return jsx
if (module.hot) {
  module.hot.accept('./pages/app', () => {
    renderApp(require('./pages/app').default)
  })
}
