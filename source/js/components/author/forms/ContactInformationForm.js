import React, { Component } from 'react';

import DocFormContainer from 'containers/packageDev/docdomain/DocFormContainer';

import srSchemaFunc from 'domain/formSchemas/srSchemaFunc';
import srUiSchema from 'domain/formUiSchemas/srUiSchema';

import 'bootstrap/dist/css/bootstrap.css';

export default class ContactInformationForm extends Component {
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
            routeParams={ this.props.params || {} }
          />
        </div>
      </div>
    )
  }
}


