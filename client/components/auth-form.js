import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="auth-form">
      <div id="auth-form">
        <div id="auth-method">{displayName}</div>
        <form onSubmit={handleSubmit} name={name}>
          {name === 'signup' && (
            <div>
              <label htmlFor="firstName" />
              <input name="firstName" type="text" placeholder=" First name" />
              <label htmlFor="lastName" />
              <input name="lastName" type="text" placeholder=" Last name" />
            </div>
          )}
          <div>
            <label htmlFor="email" />
            <input name="email" type="text" placeholder=" email" />
          </div>
          <div>
            <label htmlFor="password" />
            <input name="password" type="password" placeholder=" password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      let firstName
      let lastName
      if (name === 'signup') {
        firstName = evt.target.firstName.value
        lastName = evt.target.lastName.value
      }
      const formName = evt.target.name

      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
