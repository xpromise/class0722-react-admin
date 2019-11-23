/*
  根据prevState和action来生成newState
*/
import {
  combineReducers
} from 'redux';

import user from './user';
import category from './category';

export default combineReducers({
  user,
  categories: category
})