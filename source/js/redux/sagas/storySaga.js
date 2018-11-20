import { takeLatest, call, put } from 'redux-saga/effects';

import {
  STORIES_GET,
  STORIES_GET_SUCCESS,
  STORIES_GET_FAIL } from '../modules/storyModule';
import { storiesGet } from '../../apiCalls';

// -------- Get stories
function createGetStories(isServer = false) {
  console.log('logs');
  return function* () { // eslint-disable-line consistent-return
    const { response , error} = yield call(storiesGet);
    const action = { type: STORIES_GET_SUCCESS, data: response };

    if(response) {
      if (isServer) {
        return action;
      }

      yield put(action);
      // const story = response;
      // yield put({ type: STORIES_GET_SUCCESS, story})
    } else {
      const action = { type: STORIES_GET_FAIL, error };

      if (isServer) {
        return action;
      }

      yield put(action);
    }

  };
}

export const getStories = createGetStories();
export const getStoriesServer = createGetStories(true);


export function* getStoriesWatcher() {
  yield takeLatest(STORIES_GET, getStories);
}

export default [
  getStoriesWatcher(),
];
