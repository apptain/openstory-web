import axios from 'axios';
import * as endpoints from './endpoints';

export const storiesGet = () => {

  //TODO pass and handle filter
  return axios.get(endpoints.storiesGetUrl, {
      crossdomain: true
    }).then(function (response) {
      // handle success
      return {response: response.data };
    })
    .catch(function (error) {
      // handle error
      return {error};
    });
};

export const storyUpsert = (story, token) => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${token}` };
  return axios.post(endpoints.storyUpsertUrl, JSON.stringify(story), headers);
};

export const profileGet = jwt => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${jwt}` };
  return axios.get(endpoints.profileGetUrl, headers);
};
