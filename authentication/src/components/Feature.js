import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchMessage } from '../actions'

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage()
  }
  
  render() {
    const { message } = this.props

    return (
      <div>
        <h2>Protected Resource</h2>
        {message && 
          <p>{message}</p>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ message }) => ({ message: message.message })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Feature)