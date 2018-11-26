import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const DocGridContainer = React.createClass({
  propTypes: {
    schemaName: PropTypes.string.required,
    columnDefs: PropTypes.func.required
  },
  onRowSelected(doc) {
    browserHistory.push(this.props.schemaName + '/' + doc[this.props.keyField]);
  },
  render() {
    return (
      <div>
        <ReactTable
          manual
          data={data}
          columns={this.props.columnDefs({onRowSelected: this.onRowSelected})}
          defaultPageSize="10"
          showPagination="false"
        />
      </div>
    )
  }
})

var mapStateToProps = function (state) {
  return {
    docs: state.docs
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
    docsGet(schemaName, searchString) {
      dispatch(actions.doc.get(schemaName, searchString || '', 1, 10))
    }
  }
}

export { DocGridContainer }

export default connect(mapStateToProps, mapDispatchToProps)(DocGridContainer)
