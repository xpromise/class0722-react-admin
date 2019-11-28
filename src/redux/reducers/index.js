/*
  根据prevState和action来生成newState
*/
import {
  combineReducers
} from 'redux';

import user from './user';
import category from './category';
import role from './role';
import lang from './lang';

export default combineReducers({
  user,
  categories: category,
  roles: role,
  lang
})