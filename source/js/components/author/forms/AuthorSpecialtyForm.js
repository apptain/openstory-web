import React, { Component } from 'react';

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


