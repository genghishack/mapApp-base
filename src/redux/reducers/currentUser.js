import initialState from "./initialState";
import {SET_CURRENT_USER} from '../actions/actionTypes';

export default function currentUser(state = initialState.currentUser, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}
