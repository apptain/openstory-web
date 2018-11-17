import React, {Component} from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import { clearHistory} from '../../redux/modules/domainModule';
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
        var affectedPerson = '';
        let ticketInfo;

        if(doc.personsSelect){
            try {
                const persons = JSON.parse(doc.personsSelect)
                if(persons.affectedName){
                    affectedPerson = persons.affectedName;
                }
                else if (persons.affectedId) {
                    affectedPerson = persons.affectedId;
                }
            } catch(ex) {'handling occasional json parse error'}
            //TODO handle better
        }

        const ticketStatus = capitalizeFirstLetter(doc.meta.state.toLowerCase());

        let forLabel = '';

        if (affectedPerson) {
            forLabel = `for ${affectedPerson}`;
        }

        ticketInfo = `Ticket ${ticketStatus} ${forLabel}`;

        return (
            <li key={index} className="headings">
                <div>
                <a href={this.docHref(doc)}>
                    {dateFormat(doc.meta.dateTimeChanged, "shortTime")} -
                    {ticketInfo}
                </a>
                </div>
            </li>
        )
    }
    clearHistory(){
        this.props.clearHistory(this.props.schemaName)
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
                <a onClick={this.clearHistory}>Clear</a>
                <ol className="PnnlTimeline">
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
            dispatch(clearHistory())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocHistoryContainer)
