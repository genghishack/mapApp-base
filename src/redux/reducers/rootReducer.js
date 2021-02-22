import {combineReducers} from 'redux';
import errors from './errors';
import resources from './resources';

const rootReducer = combineReducers({
  errors,
  resources,
});

export default rootReducer;
