//these are all used async for rest calls in the sagas
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createRestActionTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export function action(type, payload = {}) {
  return {type, ...payload}
}

export function createRestAction(restActionType){
  return {
    request: (parameters) => action(restActionType['REQUEST'], {parameters}),
    success: (response, parameters) => action(restActionType['SUCCESS'], {response, parameters}),
    failure: (parameters, error) => action(restActionType['FAILURE'], {parameters,  error})
  }
}
