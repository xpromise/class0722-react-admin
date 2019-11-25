import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS
} from '../action-types/category'

const initState = [];

function categories(prevState = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.data;
    case ADD_CATEGORY_SUCCESS:
      return [...prevState, action.data]
    default:
      return prevState
  }
}

export default categories;