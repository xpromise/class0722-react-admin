import {
  GET_ROLES_SUCCESS
} from '../action-types/role'

const initValue = [];

function roles(prevState = initValue, action) {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return action.data;
    default:
      return prevState;
  }
}

export default roles