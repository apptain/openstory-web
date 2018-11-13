import { takeLatest, call, put } from 'redux-saga/effects';

import { STORY_CHANGE,
  STORY_SELECT,
  STORIES_GET,
  STORIES_GET_SUCCESS,
  STORIES_GET_FAIL,
  STORY_UPSERT,
  STORY_UPSERT_SUCCESS,
  STORY_UPSERT_FAIL,
  CATEGORIES_GET,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_FAIL } from '../modules/stories';
import {fork, take} from "redux-saga/es/effects";


// -------- Get stories

function createGetStories(isServer = false) {
  return function* (apiCall) { // eslint-disable-line consistent-return
    try {
      const { response } = yield call(apiCall);
      const action = { type: STORIES_GET_SUCCESS, data: response };

      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
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
  while (true) {
    const { apiCall } = yield take(STORIES_GET);
    yield fork(getStories, apiCall);
  }
}

export default [
  getStoriesWatcher(),
];
