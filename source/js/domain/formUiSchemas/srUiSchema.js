import React, {PropTypes} from "react";

export default function () {
    var srUiSchema = {
      reporterPerson: {
          classNames: 'col-sm-8'
      },
      summary: {
          classNames: 'col-sm-6 clear'
      },
      desription: {
        classNames: 'col-sm-6 clear'
      },
        application: {
            classNames: 'col-sm-3'
        },
        service: {
            classNames: 'col-sm-3'
        },
        details: {
            classNames: 'col-sm-6 summary'
        },
        priority: {
            classNames: 'col-sm-2 toggled-field',
            urgency: {
                classNames: 'col-sm-6'
            },
            impact: {
                classNames: 'col-sm-6'
            }
        },
        global: {
            'ui:widget': 'toggledSubformWidget',
            classNames: 'col-sm-4 toggled-field',
            globalticketid: {
                classNames: 'col-sm-6'
            },
            global: {
                classNames: 'col-sm-6'
            }
        },
        owner: {
            classNames: 'col-sm-6 toggled-field',
            ownerGroup: {
                classNames: 'col-sm-6'
            },
            ownerPerson: {
                classNames: 'col-sm-6'
            }
        },
        source: {
            classNames: 'col-sm-6 toggled-field'
        },
        propertyNumber: {
            classNames: 'col-sm-6 toggled-field'
        },
        chargeCode: {
            classNames: 'col-sm-6 toggled-field'
        },
        incident: {
            classNames: 'col-sm-3 clear'
        },
        classification: {
            classNames: 'col-sm-3'
        },
        status: {
            classNames: 'col-sm-3'
        },
        worklogLink: {
            classNames: 'col-sm-6 toggled-field float-left clear worklog-link'
        },
        worklogEntry: {

            classNames: 'col-sm-6'
        },
        resolution: {

            classNames: 'col-sm-6 float-right'
        }
    }

    return srUiSchema
}
