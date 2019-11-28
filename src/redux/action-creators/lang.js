import {
  SET_LANG_SUCCESS
} from '../action-types/lang'

export const setLangSuccess = (lang) => ({
  type: SET_LANG_SUCCESS,
  data: lang
})