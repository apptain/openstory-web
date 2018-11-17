import React, { PropTypes, Container } from 'react'
import HiddenFormWidget from './formWidgets/toggledSubformWidget'

export default function CustomFieldTemplate(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  if(props.uiSchema['ui:widget'] == 'toggledSubformWidget'){
      return(
        <div className={classNames}>
            <HiddenFormWidget {...props} uiSchema={props.uiSchema} children={children} />
        </div>
      )
  }
  return (
    <div className={classNames}>
      <label htmlFor={id}>{label}{required ? "*" : null}</label>
      {description}
      {children}
    </div>
  )
}
