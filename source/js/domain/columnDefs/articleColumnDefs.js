import React, { PropTypes, Component } from 'react'
import {Modal} from 'react-bootstrap'
import ArticleModalContainer from '../../containers/articleModalContainer'
import dateFormat from 'dateformat'

export default function srColumnDefs(props) {
    return [
        {
            accessor: 'title',
            header: "TITLE",
            render: data => {
                data.row.show =false
                return (
                    <div>
                        <ArticleModalContainer article={data.row} />
                    </div>
                )
            }
        }
    ]
}
