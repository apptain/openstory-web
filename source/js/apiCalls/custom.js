import {callApi} from './utils';
import * as endpoints from './endpoints';

//callApi gets lost from scope in apiCalls without this
const scopedCallApi = callApi;

export const storiesGet = () => {
  //TODO pass and handle filter
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors' };
  return scopedCallApi(endpoints.storiesGetUrl, null, null, headers);
};

export const storyUpsert = (story, token) => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${token}` };
  return scopedCallApi(endpoints.storyUpsertUrl, 'POST', JSON.stringify(story), headers);
};

export const profileGet = jwt => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${jwt}` };
  return scopedCallApi(endpoints.profileGetUrl, null, null, headers);
};
