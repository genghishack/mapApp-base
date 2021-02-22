import {combineReducers} from 'redux';
import errors from './errors';
import resources from './resources';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  errors,
  currentUser,
  resources,
});

export default rootReducer;
