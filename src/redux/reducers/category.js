import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DEL_CATEGORY_SUCCESS
} from '../action-types/category'

const initState = [];

function categories(prevState = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.data;
    case ADD_CATEGORY_SUCCESS:
      return [...prevState, action.data]
    case UPDATE_CATEGORY_SUCCESS:
      return prevState.map((category) => {
        if (category._id === action.data._id) {
          // 如果id匹配上，就返回修改后的数据
          return action.data
        }
        // 如果没有匹配上，就返回原数据
        return category;
      })
    case DEL_CATEGORY_SUCCESS:
      return prevState.filter((category) => category._id !== action.data)
    default:
      return prevState
  }
}

export default categories;