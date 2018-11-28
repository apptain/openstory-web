import React, {Container, Component} from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'debounce';
//TODO get jquery out, only used to allow for easier automated submit button click
import $ from 'jquery';

import Form from 'react-jsonschema-form';
import { Redirect } from 'react-router';
import CustomSchemaField from 'domain/formWidgets/CustomSchemaField';
import formWidgets from 'domain/formWidgets/index';
import CustomFieldTemplate from 'domain/customFieldTemplate';
// import {fetchDoc, createDoc, updateDoc} from '../../services/apiCalls';
import {docChange, docInitiate, docFieldChange, viewGetFetch} from '../../../redux/modules/domainModule';
import { Action, withStateMachine } from 'react-automata';
import { docFormStateMachine } from 'machines/docStateMachines';

import 'bootstrap/dist/css/bootstrap.css';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

function debounceEventHandler(...args) {
  const debounced = debounce(...args)
  return function (e) {
    return debounced(e)
  }
}

class DocFormContainer extends Component {
  static propTypes = {
    schemaName: PropTypes.string,
    schemaFunc: PropTypes.func,
    uiSchema: PropTypes.func,
    validate: PropTypes.func,
    keyField: PropTypes.string,
    docId: PropTypes.string,
    docDefault: PropTypes.object,
    formToDomainDoc: PropTypes.func,
    domainToFormDoc: PropTypes.func,
    getDocViewFetch: PropTypes.func,
    getDocViewCreateCall: PropTypes.func,
    getDocViewUpdateCall: PropTypes.func,
    onDocChange: PropTypes.func,
    routeParams: PropTypes.any,
  }
  constructor(props){
    super(props);
    this.state = {
      schemaName: props.schemaName,
      docId: props.docId,
      doc: props.doc
    };
  }
  static get defaultProps() {
    return {
      views: [],
    };
  }
  causeSubmit(){
    $('[type=submit]').click()
  }
  componenDidMount(){
    //disable enter key submit
    $(document).ready(function() {
      $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
          return false;
        }
      });
    });
  }
  docSave(form){
    //TODO
  }
  onFieldChange = (fieldName, newValue) => {
    const doc = this.props.docs[this.props.schemaName] && this.state.docId ?
      this.props.docs[this.props.schemaName][this.state.docId] : null;
    this.props.docFieldChange(doc, fieldName, newValue, this.props.docChange);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger;
    const docId = nextProps.match ? nextProps.match.params.id : null ||
      nextProps.routeParams ? nextProps.routeParams.id : null ||
      nextProps.params.id;
    const schemaName = nextProps.match ? nextProps.match.params.schemaName : null ||
    nextProps.routeParams ? nextProps.routeParams.schemaName : null ||
      nextProps.params.schemaName;
    if(docId && !prevState.doc) {
      const doc = nextProps.docs[schemaName] ?
        nextProps.docs[schemaName][docId] : null;
      if (doc) {
        nextProps.transition('DOC_SELECTED');
        return { docId, schemaName, doc };
        //nextProps.transition('DOC_INITIATED');
      } else {
        //sets state
        return { docId, schemaName };
      }
    }
    return null;
  }
  render() {
    if (!this.state.docId) {
      const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
      const tempId = ObjectId();
      this.props.docInitiate(this.props.schemaName, {}, this.props.keyField, tempId);

      return (
        <Redirect
          to={{
            pathname: `${history.location.pathname}/${tempId}`,
            state: { docId: tempId },
          }}
        />
      );
    }

    const doc = this.state.doc || {};

    const schema = this.props.schemas[this.props.schemaName];
    const formSchema = JSON.Parse(schema.schema);
    const uiSchema = JSON.Parse(schema.uiSchema);

    const formContext = {
      onFieldChange: this.onFieldChange
    };

    return (
      <div className="doc-form-container">
        <Action is="initializing">
          <h1>Initializing...</h1>
        </Action>
        <Action is="ready">
          <div className="container">
            <Form
              safeRenderCompletion={ true }
              formContext={ formContext }
              schema={ formSchema }
              formData={ doc }
              uiSchema={ uiSchema }
              validate={ this.props.validate }
              // onChange={docChangeDebounced}
              onSubmit={ this.docSave }
              //transformErrors={this.props.transformErrors}
              widgets={ formWidgets }
              fields={{ SchemaField: CustomSchemaField }}
              FieldTemplate={ CustomFieldTemplate }
            />
          </div>
        </Action>
      </div>
    )
  }
}

var mapStateToProps = function (state) {
  return {
    docs: state.domain.docs,
    schemas: state.domain.schemas
  };
}

var mapDispatchToProps = function (dispatch) {
  return {
    docInitiate(schemaName, doc, keyField, tempId) {
      dispatch(docInitiate(schemaName, doc, keyField, tempId));
      // history.push(`${history.location.pathname}/${tempId}`, { state: {id: tempId} });
    },
    docChange(schemaName, doc, formData, keyField, id, onChange){
      dispatch(docChange(schemaName, doc, formData, keyField, id, onChange))
    },
    docFieldChange(doc, fieldName, newValue, docChange) {
      dispatch(docFieldChange(doc, fieldName, newValue, docChange));
    }
  }
}

const statechart = {
  id: 'docFormStateMachine',
  initial: 'initializing',
  states: {
    initializing: {
      onEntry: 'initializing',
      on: {
        DOC_SELECTED: 'ready',
        DOC_INITIATED: 'ready'
      }
    },
    initializeError: {},
    ready: {
      onEntry: 'ready',
    }
  }
};


export default withStateMachine(statechart)(connect(mapStateToProps, mapDispatchToProps)(DocFormContainer))
