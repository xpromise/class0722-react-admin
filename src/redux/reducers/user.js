import {
  GET_USER_SUCCESS
} from '../action-types/user';

function user(prevState = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.data;
    default:
      return prevState
  }
}

export default user;