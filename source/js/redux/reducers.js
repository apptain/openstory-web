import { combineReducers } from 'redux';
import stories from './modules/storyModule';
import auth from './modules/authModule';
import domain from './modules/domainModule';

export default combineReducers({
  //TODO refactor to story
  stories,
  domain,
  auth
})
