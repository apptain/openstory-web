import React, {Container, Component} from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'debounce';
import $ from 'jquery';

import Form from 'react-jsonschema-form';
import formWidgets from 'domain/formWidgets/index';
import CustomFieldTemplate from 'domain/customFieldTemplate';
// import {fetchDoc, createDoc, updateDoc} from '../../services/apiCalls';
import {docChange, docInitiate, viewGetFetch} from '../../../redux/modules/domainModule';
import { Action, withStateMachine } from 'react-automata';
import { docFormStateMachine } from 'machines/docStateMachines';

import 'bootstrap/dist/css/bootstrap.css';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

//TODO dup code move to utils
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
    defaultDoc: PropTypes.object,
    formToDomainDoc: PropTypes.func,
    domainToFormDoc: PropTypes.func,
    getDocViewFetch: PropTypes.func,
    getDocViewCreateCall: PropTypes.func,
    getDocViewUpdateCall: PropTypes.func,
    onDocChange: PropTypes.func,
  }

  static get defaultProps() {
    return {
      views: []
    };
  }
  state = {
    doc: null
  }
  causeSubmit(){
    $('[type=submit]').click()
  }
  componentDidMount(){
    this.docInit();
    //disable enter key submit
    $(document).ready(function() {
      $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
          return false;
        }
      });
    });
  }
  docInit() {
    debugger;
    if(this.props.views.length > 0) {
      this.props.transition('VIEWS_GETTING');
      this.props.views.forEach((view) => {
        //TODO wire up
      })
    }

    if(this.params ? this.params.id : null) {
      const doc = this.props.docs[this.props.schemaName] ?
        this.props.docs[this.props.schemaName][this.id] : null;
      if (doc) {
        this.setState({doc});
        this.props.transition('DOC_SELECTED');
      } else {
        //TODO doc getting REST call
        this.props.transition('DOC_GETTING');
      }
    } else {
      debugger;
      // if (!form.meta) {
      this.props.transition('DOC_INITIATING');
      const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

      const tempId = ObjectId();
      //TODO wire up default docs
      this.props.docInitiate(this.props.schemaName, {}, this.props.keyField, tempId);
      // } else {
    }
  }
  docSave(form){
      const doc = form.formData;
      const id = form.formData[this.props.keyField];
      // if(id){
      //     this.props.docUpdateFetch(this.props.schemaName, updateDoc, doc, id, this.props.formToDomainDoc, this.props.domainToFormDoc, this.props.keyField)
      // } else {
      //     this.props.docCreateFetch(this.props.schemaName, createDoc, doc, this.props.formToDomainDoc, this.props.domainToFormDoc, this.props.keyField)
      // }
  }
  docChange = form => {
    debugger;
    this.props.onChange(form.formData, this.props.docChange, this.props.schemaName, this.props.keyField);
  }
  render() {
    debugger;
      const doc = this.state.doc || {}
      // const connectedSchema =  {
      //   schemaName: this.props.schemaName,
      //   schemaFunc: this.props.schemaFunc,
      //   keyField: this.props.keyField,
      //   views: this.viewsReady(),
      //   uiSchema: this.props.uiSchema
      // }
      // const selectLists = []
      //
      // connectedSchema.views.forEach((sub) => {
      //     selectLists.push(sub.transform(sub.data))
      // })

      //TODO stop persisting func in store
      const schema = this.props.schemaFunc()

      this.loaded = true
      this.loading = false

      //300 millisecond delay for debounce
      const docChangeDebounced = debounceEventHandler(this.docChange, 300);
      return (
          <div className="doc-form-container">
            <div className="container">
              <Form
                  safeRenderCompletion={true}
                  formContext={this.state.doc}
                  schema={schema}
                  formData={ doc }
                  uiSchema={this.props.uiSchema()}
                  validate={this.props.validate}
                  onChange={docChangeDebounced}
                  onSubmit={this.docSave}
                  //transformErrors={this.props.transformErrors}
                  widgets={formWidgets}
                  FieldTemplate={CustomFieldTemplate}
              />
            </div>
          </div>
      )
        //}
    // }
    // return (
    //     <div>Loading...</div>
    // )
  }
}

var mapStateToProps = function (state) {
  return {
    docs: state.domain.docs,
    views: state.domain.views
  }
}

//TODO make dispatches look cool like redux saga
//create named or unnamed param handler
var mapDispatchToProps = function (dispatch) {
  return {
    // setDisplay(setName, value){
    //     dispatch(actions.display.set(setName, value))
    // },
    // viewGet(schemaName, apiCall, id, transform){
    //     dispatch(viewGetFetch(schemaName, apiCall, id, transform));
    // },
    // docGetFetch(schemaName, apiCall, id, transform, keyField){
    //     dispatch(actions.domain.docGetFetch(schemaName, apiCall, id, transform, keyField))
    // },
    docInitiate(schemaName, doc, keyField, tempId) {
      dispatch(docInitiate(doc, schemaName, tempId, keyField));
      history.push(`${history.location.pathname}/${tempId}`);
    },
    docChange(schemaName, doc, keyField, id, onChange){
      dispatch(docChange(schemaName, doc, keyField, id, onChange))
    },
    // docCreateFetch(schemaName, apiCall, doc, formToDomainDoc, domainToFormDoc, keyField){
    //     dispatch(actions.domain.docCreateFetch(schemaName, apiCall, doc, formToDomainDoc, domainToFormDoc, keyField))
    // },
    // docUpdateFetch(schemaName, apiCall, doc, id, formToDomainDoc, domainToFormDoc, keyField){
    //     dispatch(actions.domain.docUpdateFetch(schemaName, apiCall, doc, id, formToDomainDoc, domainToFormDoc, keyField))
    // }
  }
}

export default withStateMachine(docFormStateMachine)(connect(mapStateToProps, mapDispatchToProps)(DocFormContainer))
