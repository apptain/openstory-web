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
