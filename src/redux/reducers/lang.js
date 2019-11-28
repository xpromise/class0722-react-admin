import {
  getItem
} from '../../utils/storage'
import {
  SET_LANG_SUCCESS
} from '../action-types/lang'

const initValue = getItem('i18nextLng') || window.navigator.language || 'en';

function lang(prevState = initValue, action) {
  switch (action.type) {
    case SET_LANG_SUCCESS:
      return action.data;
    default:
      return prevState
  }
}

export default lang;