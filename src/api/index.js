/*
  用来定义请求方法模块
*/
import axiosInstance from './request';

// 请求登录
export const reqLogin = (username, password) => axiosInstance({
  method: 'POST',
  url: '/login',
  data: {
    username,
    password
  }
})

// 请求分类列表数据
export const reqGetCategories = () => axiosInstance({
  method: 'GET',
  url: '/category/get',
})

// 请求添加分类数据
export const reqAddCategory = (categoryName) => axiosInstance({
  method: 'POST',
  url: '/category/add',
  data: {
    categoryName
  }
})

// 请求修改分类数据
export const reqUpdateCategory = (categoryId, categoryName) => axiosInstance({
  method: 'POST',
  url: '/category/update',
  data: {
    categoryId,
    categoryName
  }
})