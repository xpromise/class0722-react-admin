import {
  reqGetCategories,
  reqAddCategory,
  reqUpdateCategory,
  reqDelCategory
} from '../../api';
import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DEL_CATEGORY_SUCCESS
} from '../action-types/category'

const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: categories
})

const addCategorySuccess = (category) => ({
  type: ADD_CATEGORY_SUCCESS,
  data: category
})

const updateCategorySuccess = (category) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  data: category
})

const delCategorySuccess = (categoryId) => ({
  type: DEL_CATEGORY_SUCCESS,
  data: categoryId
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

export const updateCategoryAsync = (categoryId, categoryName) => {
  return (dispatch) => {
    return reqUpdateCategory(categoryId, categoryName)
      .then((response) => {
        dispatch(updateCategorySuccess(response));
      })
  }
}

export const delCategoryAsync = (categoryId) => {
  return (dispatch) => {
    return reqDelCategory(categoryId)
      .then((response) => {
        dispatch(delCategorySuccess(response));
      })
  }
}