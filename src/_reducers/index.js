import { alert } from './alert.reducer'
import { authentication } from './authentication.reducer'
import { combineReducers } from 'redux'
import { poll } from './poll.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  poll,
})

export default rootReducer
