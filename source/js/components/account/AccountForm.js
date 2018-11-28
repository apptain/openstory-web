import React, { PropTypes, Component } from 'react';

import DocFormContainer from 'containers/packageDev/domaindock/DocFormContainer';
import DocHistoryContainer from 'containers/packageDev/domaindock/DocHistoryContainer';

import srSchemaFunc from 'domain/formSchemas/srSchemaFunc';
import srUiSchema from 'domain/formUiSchemas/srUiSchema';

import 'bootstrap/dist/css/bootstrap.css';

export default class AccountForm extends Component {
  render() {
    const { match: { params } } = this.props;
    //TODO Layout with material and not boostrap
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
            routeParams={ params }
          />
        </div>
        <div className="col-sm-3">
          <DocHistoryContainer schemaName="sr" />
        </div>
      </div>
    )
  }
}


