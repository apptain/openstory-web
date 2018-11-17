import React, { PropTypes, Component } from 'react'
import dateFormat from 'dateformat'

export default function srColumnDefs(props) {
    return [
        { id: 'dateTime', minWidth: 130, accessor: x => dateFormat(x.reportdate), header: 'Date', sort: "desc" },
        { accessor: 'ticketid', header: "Ticket" },
        { accessor: 'affectedusername', header: "Affected User" },
        { accessor: 'status', header: "Status" },
        { accessor: 'urgency', header: "Urgency" },
        {
            header: '',
            render: data => {
                return (
                    <a onClick={props.onRowSelected.bind(this, data.row)} className="pnnl-action" >
                        <span className="pnnl-icon-edit"></span>
                        <small>Edit</small>
                    </a>
                )
            }
        }
    ]
}
