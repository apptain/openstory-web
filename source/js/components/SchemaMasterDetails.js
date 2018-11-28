import React, { Component } from 'react';

import MasterDetailsContainer from 'containers/packageDev/domaindock/MasterDetailsContainer';

export default class SchemaMasterDetails extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <MasterDetailsContainer
          schemaName='schema'
          routeParams={ this.props.params || {} }
        />
      </div>
    );
  }
}
