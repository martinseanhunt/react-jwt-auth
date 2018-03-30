import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps() {
      this.checkAuth()
    }

    checkAuth = () => {
      if(!this.props.auth) this.props.history.push('/')
    }

    render() {
      return this.props.auth
        ? <ComposedComponent {...this.props} />
        : null
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth: auth.authenticated })

  return withRouter(connect(mapStateToProps)(Authentication))
}