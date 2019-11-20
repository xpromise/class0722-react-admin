/*
  用来创建action对象
    同步action creator: 返回值就是action对象
    异步action creator: 返回值是一个函数，在函数中完成异步操作
*/
import {
  reqLogin
} from '../../api';
import {
  GET_USER_SUCCESS
} from '../action-types/user';

// 同步
const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  data: user
})

// 异步
export const getUserAsync = (username, password) => {
  return (dispatch) => {
    // 进行异步操作
    return reqLogin(username, password)
      .then((response) => {
        // 创建action
        const action = getUserSuccess(response)
        // 调用dispatch方法
        dispatch(action);
        return response;
      })
  }
}