import {combineReducers} from 'redux';
import errors from './errors';

const rootReducer = combineReducers({
  errors,
});

export default rootReducer;
