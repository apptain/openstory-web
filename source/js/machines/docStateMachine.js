import { Machine } from 'xstate';

const docLogState = Machine(
  {

  }
)

const docErrorState = Machine(
  {

  }
)

const docState = Machine({
  id: 'docStateMachine',
  states: {
    new: {
      on: {
        DOC_CLOSE: 'closed',
        DOC_CHANGE: 'updated',
      }
    },
    opened: {
      on: {
        DOC_CHANGE: 'updated',
      }
    },
    updated: {
      DOC_SAVE: 'updated',
    },
    saved: {
      DOC_CLOSE: 'closed',
    },
    closed: {
      //TODO cleanup from state handling
    }
  }
});

