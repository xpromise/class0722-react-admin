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