import axios from 'axios'
import {
  FETCH_ADMIN_USERS_FAILURE, FETCH_ADMIN_USERS_REQUEST,
  FETCH_ADMIN_USERS_SUCCESS,
  ADD_ADMIN_USER,
  UPDATE_ADMIN_USER,
  DELETE_ADMIN_USER
} from './adminUserTypes'

export const fetchAdminUsers = () => {
  return (dispatch) => {
    dispatch(fetchAdminUsersRequest())
    axios
      .get('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin')
      .then(response => {
        // response.data is the users
        const users = response.data
        dispatch(fetchAdminUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchAdminUsersFailure(error.message))
      })
  }
}


export const fetchAdminUsersRequest = () => {
  return {
    type: FETCH_ADMIN_USERS_REQUEST
  }
}

export const fetchAdminUsersSuccess = users => {
  return {
    type: FETCH_ADMIN_USERS_SUCCESS,
    payload: users
  }
}

export const fetchAdminUsersFailure = error => {
  return {
    type: FETCH_ADMIN_USERS_FAILURE,
    payload: error
  }
}

export const addAdminUser = (values) => {
  return {
    type: ADD_ADMIN_USER,
    payload: values
  }
}
export const updateAdminUser = (values) => {
  return {
    type: UPDATE_ADMIN_USER,
    payload: values
  }
}

export const deleteAdminUser = (id) => {
  return {
    type: DELETE_ADMIN_USER,
    payload: id
  }
}