import { Machine } from 'xstate';

const machine = Machine({
  id: 'docFormStateMachine',
  initial: 'initializing',
  states: {
    initializing: {
      type: 'parallel',
      on: {
        //*****IF VIEWS ARE GETTING SHOULD BE FIRST STATE SET TO WORK
        //TODO FIX
        VIEWS_GETTING: 'viewsGetting',
        //could include api calls
        DOC_INITIATING: 'docInitiating',
        //we are trusting docFormContainer to correctly set from state
        DOC_SELECTED: 'docSelected',
        //TODO make docGetting function parrellel
        DOC_GETTING: 'docGetting',
      },
      states: {
        viewsGetting: {
          //TODO Separate For Each View Get and make Parallel
          on: {
            VIEWS_GET_SUCCESS: [
              { cond: ({ state }) => Object.values(state).filter(v => v === 'viewsGetting').length === 0 &&
                  Object.values(state).filter(v => v === 'viewsGetting').length === 0, target: 'ready' },
            ],
            VIEWS_GET_ERROR: 'fetchError',
          }
        },
        docInitiating: {
          on: {
            DOC_INITIATED: [
              { cond: ({ state }) => Object.values(state).filter(v => v === 'viewsGetting').length === 0, target: 'ready' }
            ]
          }
        },
        docSelected: {
          onEntry: [
            { cond: ({ state }) => Object.values(state).filter(v => v === 'viewsGetting').length === 0, target: 'ready' }
          ]
        },
        docGetting: {
          on: {
            DOC_GET_SUCCESS: [
              { cond: ({ state }) => Object.values(state).filter(v => v === 'viewsGetting').length === 0, target: 'ready' }
            ],
            DOC_GET_ERROR: 'fetchError',
          }
        }
      }
    },
    initializeError: {},
    ready: {
      type: 'parallel',
      states: {
        error: {},
        changing: {},
        creating: {},
        updating: {},
        deleting: {},
        conflict: {},
        saveRequest: {},
        deleteRequest: {},
        //would be monitored by sockets
        externalDocChange: {},
        externalViewChange: {}
      }
    }
  }
});

export default machine;
