import {
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS,
  UPDATE_ROLE_SUCCESS
} from '../action-types/role'
import {
  reqGetRoles,
  reqAddRole,
  reqUpdateRole
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


const addRoleSuccess = (role) => ({
  type: ADD_ROLE_SUCCESS,
  data: role
})

export const addRoleAsync = (name) => {
  return (dispatch) => {
    return reqAddRole(name)
      .then((res) => {
        dispatch(addRoleSuccess(res))
      })
  }
}

const updateRoleSuccess = (role) => ({
  type: UPDATE_ROLE_SUCCESS,
  data: role
})

export const updateRoleAsync = ({roleId, menus, authName}) => {
  return (dispatch) => {
    return reqUpdateRole({roleId, menus, authName})
      .then((res) => {
        dispatch(updateRoleSuccess(res))
      })
  }
}

