/*
  根据prevState和action来生成newState
*/
import {
  combineReducers
} from 'redux';

import user from './user';
import category from './category';
import role from './role';

export default combineReducers({
  user,
  categories: category,
  roles: role
})