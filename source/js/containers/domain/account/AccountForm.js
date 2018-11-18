import React, { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';

import DocFormContainer from '../../doc/DocFormContainer';
import DocHistoryContainer from '../../doc/DocHistoryContainer';

import { connect } from 'react-redux';

import srSchemaFunc from '../../../domain/formSchemas/srSchemaFunc';
import srUiSchema from '../../../domain/formUISchemas/srUiSchema';

import 'bootstrap/dist/css/bootstrap.css';

const docState = {
  blank: "BLANK",
  new: "NEW",
  open: "OPEN",
  updated: "UPDATED",
  saved: "SAVED",
  closed: "CLOSED"
}

export default class Account extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="col-sm-9">
          <DocFormContainer
            schemaName="sr"
            keyField="ticketid"
            schemaFunc={srSchemaFunc}
            uiSchema={srUiSchema}
            onDocChange={this.onDocChange}
            views={[]}
          />
        </div>
        <div className="col-sm-3">
          <DocHistoryContainer schemaName="sr" />
        </div>
      </div>
    )
  }
}


