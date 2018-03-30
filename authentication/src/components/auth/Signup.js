import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { signupUser } from '../../actions'

class Signup extends Component {
  handleFormSubmit = ({ email, password }) => 
    this.props.signupUser(email, password)

  renderField = ({ input, label, type, meta: { touched, error, active }}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          (error && <span style={{display: 'block', fontSize: 9, color: 'red'}}>{error}</span>)}
      </div>
    </div>
  )
  
  render() {
    const { handleSubmit, errorMessage } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field name="email" component={this.renderField} type="email" label="email" />
        <Field name="password" component={this.renderField} type="password" label="password" />
        <Field name="passwordConf" component={this.renderField} type="password" label="confirm password" />
        {errorMessage && <span>{errorMessage}</span>}
        <button action="submit">Submit</button>
      </form>
    )
  }
}

const validate = ({ email, password, passwordConf }) => {
  const errors = {}

  if(!password) errors.passwordConf = 'Please enter a password'
  if(!email) errors.email = 'Please enter an email'
  if(!passwordConf) errors.passwordConf = 'Please enter a password confirmation'
  
  if (password !== passwordConf)
    errors.password = 'Passwords must match'

  return errors
}

const mapStateToProps = ({ auth }) => ({ 
  errorMessage: auth.error
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({ signupUser }, dispatch)

export default reduxForm({ form: 'signup', validate })(connect(mapStateToProps, mapDispatchToProps)(Signup))