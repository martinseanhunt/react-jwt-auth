import axios from 'axios'
import history from '../helpers/history.js'

const API = 'http://localhost:3090/'

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const AUTH_ERROR = 'AUTH_ERROR'
export const SET_MESSAGE = 'SET MESSAGE'

// redux thunk allows us to return a function from an action creator instead of an action
// The function has access to dispatch so can dispatch multiple actions asyncronously

export const authenticateUser = authenticated => ({
  type: SET_AUTHENTICATED,
  payload: authenticated
})

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export const signinUser = (email, password) => (dispatch) => {
  axios.post(`${API}signin`, { email, password })
    .then(response => {
      dispatch(authenticateUser(true))
      localStorage.setItem('token', response.data.token)
      history.push('/feature')
    })
    .catch(err => {
      dispatch(authError('Incorrect login'))
    })
}

export const signupUser = (email, password) => dispatch => {
  axios.post(`${API}signup`, { email, password })
    .then(response => {
      dispatch(authenticateUser(true))
      localStorage.setItem('token', response.data.token)
      history.push('/feature')
    })
    .catch((err) => {
      dispatch(authError(err.response.data.error))
    })
}

export const fetchMessage = () => dispatch => {
  axios.get(`${API}prot`, {
    headers: { authorization: localStorage.getItem('token') }
  })
    .then(res => dispatch({ type: SET_MESSAGE, payload: res.data.message }))
    .catch(err => {
      dispatch(authenticateUser(false))
      localStorage.removeItem('token')
      history.push('/')
    })
}

export const signoutUser = () => dispatch => {
  dispatch(authenticateUser(false))
  localStorage.removeItem('token')
}