export default function () {
  //
  return {
    type: 'object',
    title: ' ', //temp hack for spacing : )
    required: ["description"],
    properties: {
      //personsSelect is a json container for affected person and reporting person
      personsSelect: {
        type: 'string'
      },
      summary: {
        title: 'Summary',
        maxLength: 320,
        type: 'string'
      },

      service: {
        title: 'Service',
        maxLength: 8,
        type: 'string'
      },
      details: {
        title: 'Details',
        maxLength: 32000,
        type: 'string'
      },
      priority: {
        type: 'object',
        title: 'Priority',
        properties: {
          urgency: {
            title: 'Urgency',
            default: 3,
            type: 'integer'
          },
          impact: {
            title: 'Impact',
            default: 3,
            type: 'integer'
          }
        }
      },
      global: {
        type: 'object',
        title: 'Global',
        properties: {
          isGlobal: {
            title: 'Is Global',
            type: 'boolean'
          },
          globalParent: {
            title: 'Global Parent',
            maxLength: 10,
            type: 'string'
          }
        }
      },
      owner: {
        type: 'object',
        title: 'Assigned To',
        properties: {
          ownerGroup: {
            title: 'Group',
            maxLength: 50,
            type: 'string'
          },
          ownerPerson: {
            type: 'string',
            title: 'Owner'
          }
        }
      },
      propertyNumber: {
        title: 'Property Number',
        maxLength: 20,
        type: 'string'
      },
      chargeCode: {
        title: 'Charge Code',
        type: 'string',
        // enum: chargeCodes.map(function(x) {return x.value}),
        // enumNames: chargeCodes.map(function(x) {return x.label})
      },
      incident: {
        title: 'Incident',
        type: 'string',
        enum: ['Incident', 'Service Request']
      },
      classification: {
        title: 'Classification',
        maxLength: 20,
        type: 'string'
      },
      // worklog: {
      //
      // }
      worklogLink: {
        title: 'Worklog',
        type: 'string'
      },
      resolution: {
        title: 'Resolution',
        maxLength: 32000,
        type: 'string'
      },
      worklogEntry: {
        title: '',
        maxLength: 32000,
        type: 'string'
      }
    }
  }
}


