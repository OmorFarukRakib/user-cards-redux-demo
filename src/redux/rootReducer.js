import { combineReducers } from 'redux'
import adminUserReducer from './adminUser/adminUserReducer'
import employeeUserReducer from './employeeUser/employeeUserReducer'


const rootReducer = combineReducers({
  adminUsers: adminUserReducer,
  employeeUsers: employeeUserReducer,
})

export default rootReducer