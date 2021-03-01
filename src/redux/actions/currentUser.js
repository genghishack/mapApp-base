import {SET_CURRENT_USER} from './actionTypes';

export const setCurrentUser = (payload) => {
  return {type: SET_CURRENT_USER, payload};
}
