import {combineReducers} from 'redux';
import errors from './errors';
import resources from './resources';
import categories from "./categories";
import states from "./states";
import currentUser from './currentUser';

const rootReducer = combineReducers({
  errors,
  currentUser,
  resources,
  categories,
  states
});

export default rootReducer;
