import React, {Container, Component} from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'debounce';
//TODO get jquery out, only used to allow for easier automated submit button click
import $ from 'jquery';

import Form from 'react-jsonschema-form';
import { Redirect } from 'react-router;
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
    routeParams: PropTypes.any.isRequired,
  }
  constructor(props){
    super(props);
    this.state = {
      docId: props.docId || this.props.routeParams.id,
      doc: props.doc || null
    };
  }
  static get defaultProps() {
    return {
      views: []
    };
  }
  causeSubmit(){
    $('[type=submit]').click()
  }
  componentWillReceiveProps(newProps){
    // if(newProps.variableInProps != this.props.variableInProps){
    //   this.setState({variableInState: newProps.variableInProps })
    // }
  }
  componentWillMount(){
    // if(this.state.docId) {
    //   this.props.transition('DOC_INITIATED');
    // } else {
    //   const docId = this.props.routeParams.id || this.state.docId;
    //   if(docId) {
    //     //TODO setState not working here for some reason. fix and fix dup code for doc from store
    //     this.setState({docId });
    //     const doc = this.props.docs[this.props.schemaName] && docId ?
    //       this.props.docs[this.props.schemaName][docId] : null;
    //     if (doc) {
    //       this.setState({doc});
    //       this.props.transition('DOC_SELECTED');
    //     } else {
    //       //TODO doc getting REST call
    //       this.props.transition('DOC_GETTING');
    //     }
    //   } else {
    //     if(this.props.views.length > 0) {
    //       this.props.transition('VIEWS_GETTING');
    //       this.props.views.forEach((view) => {
    //         //TODO wire up
    //       })
    //     }
    //     // if (!form.meta) {
    //     //this.props.transition('DOC_INITIATING');
    //
    //
    //     const tempId = ObjectId();
    //     this.setState({ docId: tempId });
    //     //TODO default doc props
    //     this.props.docInitiate(this.props.schemaName, {}, this.props.keyField, tempId);
    //     this.props.transition('DOC_INITIATED');
    //   }
    // }
    //
    // //disable enter key submit
    // $(document).ready(function() {
    //   $("form").bind("keypress", function (e) {
    //     if (e.keyCode == 13) {
    //       return false;
    //     }
    //   });
    // });
  }
  docSave(form){
    //TODO
  }
  onFieldChange = (fieldName, newValue) => {
    const doc = this.props.docs[this.props.schemaName] && this.state.docId ?
      this.props.docs[this.props.schemaName][this.state.docId] : null;
    this.props.docFieldChange(doc, fieldName, newValue, this.props.docChange);
    }
    render() {
    debugger;
      if(!this.props.routeParams.id || this.state.docId) {
        const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
          s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
        const tempId = ObjectId();
        return (
          <Redirect
            to={{
              pathname: `${history.location.pathname}/${tempId}`,
              state: { docId: currentLocation },
            }}
          />
        )
      }

    const doc = this.state.doc || {}
    //TODO passing of views to schema
    const schema = this.props.schemaFunc()

    //300 millisecond delay for debounce of form change
    //const docChangeDebounced = debounceEventHandler(this.docChange, 300);

    const formContext = {
      onFieldChange: this.onFieldChange //debounceEventHandler(this.onFieldChange, 300)
    };



    return (
      <div className="doc-form-container">
        <Action is="initializing">
          <h1>Initializing...</h1>
        </Action>
        <Action is="ready">
          <div className="container">
            <Form
              safeRenderCompletion={true}
              formContext={this.state.doc}
              schema={schema}
              formData={ doc }
              uiSchema={this.props.uiSchema()}
              validate={this.props.validate}
              // onChange={docChangeDebounced}
              onSubmit={this.docSave}
              //transformErrors={this.props.transformErrors}
              widgets={formWidgets}
              fields={{ SchemaField: CustomSchemaField }}
              FieldTemplate={CustomFieldTemplate}
              formContext={ formContext }
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
    views: state.domain.views,
  }
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
