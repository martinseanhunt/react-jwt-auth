import { SET_MESSAGE } from '../actions'

const defaultState = {
  message: ''
}

const message = (state = defaultState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {...state, message: action.payload}
    default: 
      return state
  }

}

export default message