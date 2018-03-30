import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { Router, Route } from 'react-router-dom'
import reduxThunk from 'redux-thunk'

import { SET_AUTHENTICATED } from './actions'
import history from './helpers/history'
import rootReducer from './reducers'
import App from './components/App'
import './styles/index.css'

const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(reduxThunk),
    applyMiddleware(logger)
  )
)

const token = localStorage.getItem('token')
if(token) store.dispatch({ type: SET_AUTHENTICATED, payload: true })

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('root')
)
