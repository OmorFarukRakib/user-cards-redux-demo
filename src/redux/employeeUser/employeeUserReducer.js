import {
  ADD_EMPLOYEE_USER, DELETE_EMPLOYEE_USER, FETCH_EMPLOYEE_USERS_FAILURE, FETCH_EMPLOYEE_USERS_REQUEST,
  FETCH_EMPLOYEE_USERS_SUCCESS, UPDATE_EMPLOYEE_USER
} from './employeeUserTypes'
  
  const initialState = {
    loading: false,
    users: [],
    error: '',
    fetchedOnce: false
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_EMPLOYEE_USER:
        let newUser = action.payload
        state.users = [...state.users, newUser]
        
        return {
          ...state,  
        }
      case UPDATE_EMPLOYEE_USER:
        let updatedUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if(updatedUserIndex > -1){
          state.users[updatedUserIndex] = action.payload;
          }    else{
            state.users = [...state.users, action.payload]
          }    

        return {
          ...state,  
        }


    case DELETE_EMPLOYEE_USER:
      let toBeDeletedUserIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );
      if(toBeDeletedUserIndex > -1){
        state.users.splice(toBeDeletedUserIndex, 1);
      }

      return {
        ...state,  
      }
      case FETCH_EMPLOYEE_USERS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_EMPLOYEE_USERS_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: '',
          fetchedOnce: true
        }
      case FETCH_EMPLOYEE_USERS_FAILURE:
        return {
          loading: false,
          users: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default reducer