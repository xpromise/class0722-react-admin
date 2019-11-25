import {
  reqGetCategories,
  reqAddCategory
} from '../../api';
import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS
} from '../action-types/category'

const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: categories
})

const addCategorySuccess = (category) => ({
  type: ADD_CATEGORY_SUCCESS,
  data: category
})

export const getCategoriesAsync = () => {
  return (dispatch) => {
    return reqGetCategories()
      .then((response) => {
        dispatch(getCategoriesSuccess(response));
      })
  }
}

export const addCategoryAsync = (categoryName) => {
  return (dispatch) => {
    return reqAddCategory(categoryName)
      .then((response) => {
        dispatch(addCategorySuccess(response));
      })
  }
}