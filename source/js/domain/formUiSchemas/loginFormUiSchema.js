import React, {PropTypes} from "react";

export default function (schema) {
  return {
    email: {
      classNames: 'col-sm-12'
    },
    password: {
      "ui:widget": "password",
      classNames: 'col-sm-12'
    }
  }
}
