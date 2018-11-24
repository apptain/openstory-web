//marvin template - augment for statecharts in redux?
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import logger from 'dev/logger';

import transit from 'transit-immutable-js';

import rootSaga from 'redux/sagas';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

import reducers from "redux/reducers";
import storage from 'redux-persist/lib/storage';

//TODO get encrypted working, throwing error from key in config
import createAsyncEncryptor from "redux-persist-transform-encrypt/async";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = persistReducer(persistConfig, reducers);


const IS_PRODUCTION = process.env.NODE_ENV === 'production';

let initialState = {};

// Remove if you are not using server rendering
try {
  // If state exists we need to parse it to JS object
  initialState = transit.fromJSON(__MARVIN_DEHYDRATED_STATE); // eslint-disable-line no-undef
} catch (e) {
  // ★★ Marvin: No dehydrated state
}


/**
 * Add all the state in local storage
 * @param getState
 * @returns {function(*): function(*=)}
 */
const localStorageMiddleware = ({getState}) => { // <--- FOCUS HERE
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(
      getState()
    ));
    return result;
  };
};

const reHydrateStore = () => { // <-- FOCUS HERE

  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState')) // re-hydrate the store

  }
}

// Creating store
// Remove "serverSagas" and "sagaOptions" params
// if you are not using server rendering
export default (serverSagas = null, sagaOptions = {}) => {
  let store = null;
  let middleware = null;

  const sagaMiddleware = createSagaMiddleware();

  if (IS_PRODUCTION) {
    // In production we are adding only sagas middleware
    middleware = applyMiddleware(sagaMiddleware, localStorageMiddleware);
  } else {
    // In development mode beside sagaMiddleware
    // logger and DevTools are added
    middleware = applyMiddleware(sagaMiddleware, localStorageMiddleware, logger);

    // Enable DevTools if browser extension is installed
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }

  // Create store
  store = createStore(
    rootReducer,
    reHydrateStore(),
    middleware,
  )

  // Server render
  // Remove if you are not using server rendering
  if (serverSagas) {
    // Start server sagas
    const tasks = serverSagas.map(saga => sagaMiddleware.run(saga, sagaOptions));

    // Return both store and tasks
    return {
      tasks,
      store,
    };
  }

  // Run root saga
  sagaMiddleware.run(rootSaga);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../redux/reducers', () => {
      const nextRootReducer = require('../redux/reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }
  //
  // // Return store only
  // // But as an object for consistency
  // return {
  //   store,
  // };

  let persistor = persistStore(store);
  return { persistor, store };
};
