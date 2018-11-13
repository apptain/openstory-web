import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import DevTools from '../../containers/DevTools'
import rootReducer from '../modules'
import rootSaga from '../redux/sagas/index'

export const sagaMiddleware = createSagaMiddleware(rootSaga)

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware
      ),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules', () => {
      const nextRootReducer = require('../modules/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
