import initialState from './initialState';
import {SET_RESOURCES} from "../actions/actionTypes";

export default function resources(state = initialState.resources, action) {
  switch (action.type) {
    case SET_RESOURCES:
      return {
        ...state,
        resources: action.payload
      };
    default:
      return state;
  }
}
