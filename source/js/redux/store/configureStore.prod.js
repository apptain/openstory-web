import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/index'
import rootSaga from '../redux/sagas/index'

export const sagaMiddleware = createSagaMiddleware(rootSaga)

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )
}
