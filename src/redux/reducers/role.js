import {
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS,
  UPDATE_ROLE_SUCCESS
} from '../action-types/role'

const initValue = [];

function roles(prevState = initValue, action) {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return action.data;
    case ADD_ROLE_SUCCESS:
      return [...prevState, action.data]
    case UPDATE_ROLE_SUCCESS:
      return prevState.map((role) => {
        if (role._id === action.data._id) {
          return action.data
        }
        return role
      })
    default:
      return prevState;
  }
}

export default roles