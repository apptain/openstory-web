import diff from 'utils/diff';
import schemaSchema from 'domain/formSchemas/schemaSchema';
import schemaUiSchema from 'domain/formUiSchemas/schemaUiSchema';
import schemaColumnDefinitions from 'domain/columnDefs/schemaColumnDefinitions';

export const DocState = {
  blank: "BLANK",
  new: "NEW",
  created: "CREATED",
  open: "OPEN",
  updated: "UPDATED",
  saved: "SAVED",
  closed: "CLOSED"
}

export const createRestAction = (restActionType) => {
  return {
    request: (schemaName, parameters, value) => action(restActionType['REQUEST'], {schemaName, parameters, value}),
    success: (schemaName, parameters, response) => action(restActionType['SUCCESS'], {schemaName, parameters, response}),
    failure: (schemaName, parameters, error) => action(restActionType['FAILURE'], {schemaName, parameters,  error})
  }
}

export const viewGetRestCall = createRestAction('VIEW_GET_REST_CALL')
export const docGetRestCall = createRestAction('DOC_GET_REST_CALL')
export const docCreateRestCall = createRestAction('DOC_CREATE_REST_CALL')
export const docUpdateRestCall = createRestAction('DOC_UPDATE_REST_CALL')

export const viewGetFetch = (schemaName, apiCall, parameters, transform) => action(viewGetFetch, {schemaName, apiCall, parameters, transform})
export const viewSet = (schemaName, view) => action(viewSet, {schemaName, view})

export const docGetFetch = (schemaName, apiCall, id, transform, keyField) => action(docGetFetch, {schemaName, apiCall, id, transform, keyField});
export const docCreateFetch = (schemaName, apiCall, doc, formToDomainDoc, domainToFormDoc, keyField) => action(docCreateFetch, {schemaName, apiCall, doc, formToDomainDoc, domainToFormDoc, keyField});
export const docUpdateFetch = (schemaName, apiCall, doc, id, formToDomainDoc, domainToFormDoc, keyField) => action(docUpdateFetch, {schemaName, apiCall, doc, id, formToDomainDoc, domainToFormDoc, keyField });

//these are non-rest related actions that meta-tag a doc and
//these should not be handle for asynchronicity with sagas
export const docInitiate = (schemaName, doc, keyField, tempId) => {
  debugger;
  const newDoc = Object.assign(doc, {meta : {
      schemaName,
      keyField,
      id: tempId,
      state: DocState.new,
      dateTimeCached: new Date(),
      dateTimeChanged: new Date(),
      initialValue: Object.assign({}, doc),
      currentValue: Object.assign({}, doc, {}),
      changeLog: []
    }, [keyField]: tempId});

  return {type: docInitiate, schemaName, doc: newDoc, keyField, tempId}
}

export const docChange = (schemaName, doc, formData, keyField, id, onChange) => {
  //TODO get doc from state instead of requiring pass
  //TODO onChange parameter handling for custom parameter
  if(doc.meta) {

    var currentValue = Object.assign({}, doc, {});
    const changes = diff.map(currentValue, formData);
    Object.assign(doc, formData);

    // doc.meta.changeLog.push({
    //   changes,
    //   dateTime: new Date()
    // });

    doc.meta.previousValue = currentValue;

    return {type: docChange, schemaName, doc, keyField, id };
  }
  return {type: ''};
}

export const docFieldChange = (doc, fieldName, newValue, docChange) => {
  //TODO docChange

  if(doc.meta) {
    var change = {
      field: fieldName,
      previousValue: doc[fieldName],
      newValue,
      dateTime: new Date()
    };
    doc[fieldName] = newValue;
    doc.meta.changeLog.push(change);
    const schemaName = doc.meta.schemaName;
    const keyField =  doc.meta.keyField;
    const id = doc[doc.meta.keyField];
    return {type: docChange, schemaName, doc, keyField, id };
  }
  return {type: ''};
}

// export const docChanged = (schemaName, doc, keyField, id) => action(docChanged, {schemaName, doc, keyField, id})

export const clearHistory = () => {
  return {type: clearHistory }
}

const actionResultTypes = {
  success: 'SUCCESS',
  info: 'INFO',
  warning: 'WARNING',
  error: 'ERROR',
  critical: 'CRITICAL'
}

const init = {
  docs: {

  },
  schemas: {
    schema: {
      name: 'Schema',
      slug: 'schema',
      schema: JSON.stringify(schemaSchema),
      uiSchema: JSON.stringify(schemaUiSchema),
      columnDefinitions: JSON.stringify(schemaColumnDefinitions),
    }
  },
  actionResultLog: []
}


export default (state = init, action) => {
  var actionResult
  switch (action.type) {
    case docGetRestCall.REQUEST:
      return state
    case docGetRestCall.SUCCESS:
      return Object.assign({}, state, {
        selectedDocs: Object.assign({}, state.selectedDocs, {
          [action.parameters.schemaName]: action.response
        }),
        docs: Object.assign({}, state.docs, {
          [action.parameters.schemaName]: Object.assign({}, state.docs[action.parameters.schemaName] || {}, {
            [action.parameters.id]: action.response
          })
        })
      })
    case docGetRestCall.FAILURE:
      actionResult = CreateActionResult(
        actionResultTypes.error,
        action.error
      )
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: [ ...state.actionResults, actionResult ]
      })
    case viewGetRestCall.REQUEST:
      return Object.assign({}, state, {
        views: Object.assign({}, state.views, {
          [action.schemaName]: {
            loading: true
          }
        })
      });
    case viewGetRestCall.SUCCESS:
      return Object.assign({}, state, {
        views: Object.assign({}, state.views, {
          [action.schemaName]: action.response
        })
      })
    case viewGetRestCall.FAILURE:
      actionResult = CreateActionResult(
        actionResultTypes.error,
        action.error
      )
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: state.actionResultLog ? [ ...state.actionResultLog, actionResult ] : [actionResult],
        views: Object.assign({}, state.views, {
          [action.schemaName]: []
        })
      })
    case docCreateRestCall.REQUEST:
      actionResult = CreateActionResult(
        actionResultTypes.info,
        action.schemaName  + ' creating...'
      )
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: state.actionResultLog ? [ ...state.actionResultLog, actionResult ] : [actionResult],
      })
    case docCreateRestCall.SUCCESS:
      actionResult = CreateActionResult(
        actionResultTypes.success,
        action.schemaName  + ' created'
      )
      delete state.docs[action.schemaName][action.response.meta.tempId]
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: state.actionResultLog ? [ ...state.actionResultLog, actionResult ] : [actionResult],
        selectedDocs: Object.assign({}, state.selectedDocs, {
          [action.schemaName]: action.response
        }),
        docs: Object.assign({}, state.docs, {
          [action.schemaName]: Object.assign({}, state.docs[action.schemaName], {
            [action.parameters]: action.response
          })
        })
      })
    case docCreateRestCall.FAILURE:
      actionResult = CreateActionResult(
        actionResultTypes.error,
        action.error
      )
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: state.actionResultLog ? [ ...state.actionResultLog, actionResult ] : [actionResult]
      })
    case docUpdateRestCall.REQUEST:
      actionResult = CreateActionResult(
        actionResultTypes.info,
        action.schemaName  + ' updating...'
      )
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: state.actionResultLog ? [ ...state.actionResultLog, actionResult ] : [actionResult],
      })
    case docUpdateRestCall.SUCCESS:
      actionResult = CreateActionResult(
        actionResultTypes.success,
        action.schemaName  + ' updated'
      )
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: state.actionResultLog ? [ ...state.actionResultLog, actionResult ] : [actionResult],
        selectedDocs: Object.assign({}, state.selectedDocs, {
          [action.schemaName]: action.doc
        }),
        docs: Object.assign({}, state.docs, {
          [action.schemaName]: Object.assign({}, state.docs[action.schemaName], {
            [action.id]: action.doc
          })
        })
      })
    case docUpdateRestCall.FAILURE:
      actionResult = CreateActionResult(
        actionResultTypes.error,
        action.error
      )
      return Object.assign({}, state, {
        actionResult,
        actionResultLog: state.actionResultLog ? [ ...state.actionResultLog, actionResult ] : [actionResult]
      })
    case viewSet:
      return Object.assign({}, state, {
        selectedViews: Object.assign({}, state.selectedViews, {
          [action.schemaName]: action.view
        }),
        views: Object.assign({}, state.views, {
          [action.schemaName]: action.view
        })
      })
    case docUpdateFetch:
      return state
    case docChange:
      return Object.assign({}, state, {
        selectedDocs: Object.assign({}, state.selectedDocs, {
          [action.schemaName]: action.doc
        }),
        docs: Object.assign({}, state.docs, {
          [action.schemaName]: Object.assign({}, state.docs[action.schemaName] || {}, {
            [action.id]: action.doc
          })
        })
      })
    case docInitiate:
      debugger;
      const updatedState = Object.assign({}, state, {
        docs: Object.assign({}, state.docs, {
          [action.schemaName]: Object.assign({}, state.docs[action.schemaName] || {}, {
            [action.tempId]: action.doc
          })
        })
      });
      return updatedState;
    case clearHistory:

      //TODO move me somewhere
      localStorage.clear()
      return Object.assign({}, state, init)
    default:
      return state
  }
}


//TODO refactor out
function CreateActionResult(resultType, message) {
  var actionResult = {}
  actionResult.clientMessage = message
  actionResult.resultType = resultType.toLowerCase()
  actionResult.dateTime = new Date()

  return actionResult
}
