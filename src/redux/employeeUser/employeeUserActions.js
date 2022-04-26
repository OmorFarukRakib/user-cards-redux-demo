import axios from 'axios'
import {
  FETCH_EMPLOYEE_USERS_FAILURE, FETCH_EMPLOYEE_USERS_REQUEST,
  FETCH_EMPLOYEE_USERS_SUCCESS,
  ADD_EMPLOYEE_USER,
  UPDATE_EMPLOYEE_USER,
  DELETE_EMPLOYEE_USER
} from './employeeUserTypes'

export const fetchEmployeeUsers = () => {
  return (dispatch) => {
    dispatch(fetchEmployeeUsersRequest())
    axios
      .get('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee')
      .then(response => {
        const users = response.data
        dispatch(fetchEmployeeUsersSuccess(users))
      })
      .catch(error => {
        dispatch(fetchEmployeeUsersFailure(error.message))
      })
  }
}

export const fetchEmployeeUsersRequest = () => {
  return {
    type: FETCH_EMPLOYEE_USERS_REQUEST
  }
}

export const fetchEmployeeUsersSuccess = users => {
  return {
    type: FETCH_EMPLOYEE_USERS_SUCCESS,
    payload: users
  }
}

export const fetchEmployeeUsersFailure = error => {
  return {
    type: FETCH_EMPLOYEE_USERS_FAILURE,
    payload: error
  }
}

export const addEmployeeUser = (values) => {
  return {
    type: ADD_EMPLOYEE_USER,
    payload: values
  }
}
export const updateEmployeeUser = (values) => {
  return {
    type: UPDATE_EMPLOYEE_USER,
    payload: values
  }
}

export const deleteEmployeeUser = (id) => {
  return {
    type: DELETE_EMPLOYEE_USER,
    payload: id
  }
}
