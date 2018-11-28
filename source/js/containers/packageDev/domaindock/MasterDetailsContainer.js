import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faLink, faList } from "@fortawesome/free-solid-svg-icons/index";

class MasterDetailsContainer extends Component {
  static propTypes = {
    schemaName: PropTypes.string
  }
  onRowSelected(doc) {
    //TODO use for driving actions available from statecharts
  }
  render() {

    const schema = this.props.schemas[this.props.schemaName];
    const columnDefinitions = JSON.parse(schema.columnDefinitions);
    columnDefinitions.push({
      header: '',
        render: data => {
          return (
            <Link
              to={{
                pathname: `schema/${ data.id }`
              }}
            >
              <FontAwesomeIcon
                icon={faLink}
              />
              <small>Edit</small>
            </Link>
          )
        }
    },
    {
      header: '',
        render: data => {
          return (
            <Link
              to={{
                pathname: `${ data.slug }`
              }}
            >
              <FontAwesomeIcon icon={faList} />
              <small>Data</small>
            </Link>
          )
        }
    });
    const schemas = this.props.schemas;
    const data = this.props.schemaName != 'schema' ?
      this.props.docs[this.props.schemaName] :
      Object.keys(schemas).map(function(key) {
        return [Number(key), schemas[key]];
      });
    return (
      <div>
        <h1>{ this.props.schemaName }</h1>
        <Link
          to={{
            pathname: `${ schema.slug }`
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <small>New { schema.name }</small>
        </Link>
        <ReactTable
          manual
          data={ data }
          columns={ columnDefinitions }
          defaultPageSize={ 10 }
          showPagination={ false }
        />
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    docs: state.domain.docs,
    schemas: state.domain.schemas,
  };
}

var mapDispatchToProps = function (dispatch) {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterDetailsContainer);
