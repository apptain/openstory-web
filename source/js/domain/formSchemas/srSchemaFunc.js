export default function (applicationNames, contactSources, statuses, serviceGroups, chargeCodes) {
  //
  return {
    type: 'object',
    title: 'Ticket',
    required: ["description"],
    properties: {
      affectedPerson: {
        type: 'string',
        title: 'Affected Person'
      },
      reporterOnly: {
        type: 'boolean',
        title: 'Reporter Only'
      },
      reporterPerson: {
        type: 'string',
        title: 'Reporter'
      },
      summary: {
        title: 'Summary',
        maxLength: 320,
        type: 'string'
      },
      application: {
        title: 'Application',
        maxLength: 50,
        type: 'string',
        enum: ['a', 'b']
      },
      service: {
        title: 'Service',
        maxLength: 8,
        type: 'string',
        enum: serviceGroups
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
      source: {
        title: 'Source',
        default: 'PHONECALL',
        type: 'string',
        enum: ['abc', 'dcere'],
      },
      propertyNumber: {
        title: 'Property Number',
        maxLength: 20,
        type: 'string'
      },
      chargeCode: {
        title: 'Charge Code',
        maxLength: 6,
        type: 'string',
        enum: ['abc', 'dcere'],
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
      status: {
        title: 'Status',
        maxLength: 10,
        type: 'string',
        enum: ['abc', 'dcere'],
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


