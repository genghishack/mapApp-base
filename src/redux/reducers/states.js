import initialState from './initialState';
import {SET_STATES} from "../actions/actionTypes";

export default function categories(state = initialState.states, action) {
  switch (action.type) {
    case SET_STATES:
      return action.payload;
    default:
      return state;
  }
}
