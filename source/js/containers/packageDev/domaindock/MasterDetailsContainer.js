import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faLink, faList } from "@fortawesome/free-solid-svg-icons/index";
import {docInitiate} from "redux/modules/domainModule";

class MasterDetailsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      schemaName: ''
    };
  }
  static propTypes = {
    schemaName: PropTypes.string
  }
  onRowSelected(doc) {
    //TODO use for driving actions available from statecharts
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const schemaName = nextProps.params ? nextProps.params.schemaName : null ||
      nextProps.routeParams ? nextProps.routeParams.schemaName : null;
    if(schemaName) {
      return { schemaName };
    }
    return null;
  }
  render() {
    const schemas = this.props.schemas;
    const data = this.props.schemaName != 'schema' ?
      this.props.docs[this.props.schemaName] :
      Object.keys(schemas).map(function(key) {
        return [Number(key), schemas[key]];
      });
    //Redirect to form
    if(data.length === 0 || this.props.schemaName === 'schema') {
      //TODO dup code, move
      const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
      const tempId = ObjectId();
      this.props.docInitiate(this.props.schemaName, {}, 'id', tempId);

      //redirect to new form if it's the first one
      return (
        <Redirect
          to={{
            pathname: `domaindock/schema/schema/${tempId}`,
            state: { schemaName: 'schema', docId: tempId, doc: {} },
          }}
        />
      );
    }
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

    return (
      <div>
        <h1>{ this.props.schemaName }</h1>
        <Link
          to={{
            pathname: `domaindock/${ schema.slug }`
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
  return {
    docInitiate(schemaName, doc, keyField, tempId) {
      dispatch(docInitiate(schemaName, doc, keyField, tempId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterDetailsContainer);
