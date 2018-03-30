import { 
  SET_AUTHENTICATED,
  AUTH_ERROR
} from '../actions'

const defaultState = {
  authenticated: false, 
  error: null
}

const auth = (state = defaultState, action) => {
  const { type, payload } = action
  switch(type) {
    case SET_AUTHENTICATED:
      return {...state, error: null, authenticated: payload }
    case AUTH_ERROR:
      return {...state, error: payload}
    default: 
      return state
  }
}

export default auth