import { all } from 'redux-saga/effects';

import storySaga from 'redux/sagas/storySaga';

export default function* rootSaga() {
  yield all([
    ...storySaga,
  ]);
}
