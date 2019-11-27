import {
  GET_ROLES_SUCCESS
} from '../action-types/role'
import {
  reqGetRoles
} from '../../api'

const getRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  data: roles
})

export const getRolesAsync = () => {
  return (dispatch) => {
    return reqGetRoles()
      .then((res) => {
        dispatch(getRolesSuccess(res))
      })
  }
}