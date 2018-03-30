import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { signinUser } from '../../actions'
import { bindActionCreators } from 'redux';

class Signin extends Component{
  handleFormSubmit = ({ email, password }) => 
    this.props.signinUser(email, password)

  render(){
    const { handleSubmit, errorMessage } = this.props

    return( 
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" component="input" type="email" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" component="input" type="password" />
        </fieldset>
        {errorMessage &&
          <span>{errorMessage}</span>
        }
        <button action="submit">Sign In</button>
      </form>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.error
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signinUser }, dispatch)

export default reduxForm({ form: 'signin' })(connect(mapStateToProps, mapDispatchToProps)(Signin))