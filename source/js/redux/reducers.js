import { combineReducers } from 'redux';
import stories from './modules/stories';
import auth from './modules/auth';

export default combineReducers({
  stories,
  auth,
})
