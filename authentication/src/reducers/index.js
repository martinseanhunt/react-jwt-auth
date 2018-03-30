import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import message from './messageReducer'

const rootReducer = combineReducers({
  auth,
  form,
  message
})

export default rootReducer 