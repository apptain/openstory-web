import React, {Component} from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import { clearHistory} from '../../../redux/modules/domainModule';
import dateFormat from 'dateformat';

//TODO move to utils
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class DocHistoryContainer extends Component {
  static propTypes = {
      schemaName: PropTypes.string
  }
  docHref(doc){
    if(doc.meta.id && doc.meta.id == doc[doc.meta.keyField]){
      return location.origin + '/' + this.props.schemaName + '/' + doc.meta.id
    } else {
      return location.origin + '?id=' + doc.meta.id
    }
  }
  renderDocHistoryItem(doc, index){
    //TODO statemachine in meta
    const docStatus = capitalizeFirstLetter(doc.meta.state.toLowerCase());

    return (
      <li key={index} className="headings">
          <div>
          <a href={this.docHref(doc)}>
            {doc.schemaName} edited on {dateFormat(doc.meta.dateTimeChanged, "shortTime")} -
          </a>
          </div>
      </li>
    )
  }
  clearHistory() {

    this.props.clearHistory(this.props.schemaName);
  }
  render() {
    const docs = []
    if(this.props.docs && this.props.docs[this.props.schemaName]) {
        //TODO speed up?
        Object.keys(this.props.docs[this.props.schemaName]).forEach((key) => {
            //todo make var
            if(this.props.docs[this.props.schemaName][key]) {
                if (this.props.docs[this.props.schemaName][key].meta) {
                    docs.push(this.props.docs[this.props.schemaName][key])
                }
            }
        })
        docs.reverse()
    }
    return (
        <div id="doc-history-container">
          <h1>History</h1>
            <a onClick={this.clearHistory.bind(this)}>Clear</a>
            <ol>
                {docs.map(this.renderDocHistoryItem, this)}
            </ol>
        </div>
    )
  }
}

var mapStateToProps = function (state) {
    return {
        docs: state.domain.docs || {}
    }
}

var mapDispatchToProps = function (dispatch) {
    return {
        clearHistory(schemaName) {

          dispatch(clearHistory());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocHistoryContainer)
