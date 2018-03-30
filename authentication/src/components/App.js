import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import Welcome from './Welcome'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Feature from './Feature'
import RequireAuth from './auth/RequireAuth'
import '../styles/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Welcome} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature" component={RequireAuth(Feature)} />
      </div>
    );
  }
}

export default App;
