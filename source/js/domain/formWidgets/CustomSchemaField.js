//thanks https://github.com/mozilla-services/react-jsonschema-form/issues/651
import React from 'react';
import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';

const CustomSchemaField = function (props) {

  const customProps = {};

  //Only process if we are dealing with a field, not the parent object
  if (props.name) {

    const formContext = props.registry.formContext;

    //Store the original onChange event provided to the SchemaField
    //as well as the name of the field
    const { onChange, name } = props;

    //Provide a new onChange event for the SchemaField
    customProps.onChange = function(formData) {

      //Call the custom handler provided in the formContext, if it exists,
      //with the field name and new value
      if (formContext && formContext.onFieldChange &&
        typeof formContext.onFieldChange === 'function') {

        formContext.onFieldChange(name, formData);
      }

      //Call the original onChange handler
      onChange(formData);
    };

  }

  return (
    <SchemaField {...props} {...customProps} />
  );
};

export default CustomSchemaField;
