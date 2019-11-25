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

// 获取分类数据的action-creator
// 同步
const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: categories
})
// 异步
export const getCategoriesAsync = () => {
  return (dispatch) => {
    return reqGetCategories()
      .then((response) => {
        dispatch(getCategoriesSuccess(response));
      })
  }
}

// 添加分类数据的action-creator
// 同步
const addCategorySuccess = (category) => ({
  type: ADD_CATEGORY_SUCCESS,
  data: category
})
// 异步
export const addCategoryAsync = (categoryName) => {
  return (dispatch) => {
    return reqAddCategory(categoryName)
      .then((response) => {
        dispatch(addCategorySuccess(response));
      })
  }
}

// 更新分类数据的action-creator
// 同步
const updateCategorySuccess = (category) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  data: category
})
// 异步
export const updateCategoryAsync = (categoryId, categoryName) => {
  return (dispatch) => {
    return reqUpdateCategory(categoryId, categoryName)
      .then((response) => {
        dispatch(updateCategorySuccess(response));
      })
  }
}

// 删除分类数据的action-creator
// 同步
const delCategorySuccess = (categoryId) => ({
  type: DEL_CATEGORY_SUCCESS,
  data: categoryId
})
// 异步
export const delCategoryAsync = (categoryId) => {
  return (dispatch) => {
    return reqDelCategory(categoryId)
      .then((response) => {
        dispatch(delCategorySuccess(response));
      })
  }
}