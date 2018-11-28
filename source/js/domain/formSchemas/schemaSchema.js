export default {
  type: 'object',
  title: 'Schema',
  required: ['name', 'slug', 'schema', 'uiSchema', 'columnDefinitions'],
  properties: {
    name: {
      title: 'Name',
      type: 'string'
    },
    slug: {
      title: 'Slug',
      type: 'string',
      description: 'TODO: build a component for slugs',
    },
    schema: {
      title: 'Schema',
      type: 'string',
      description: 'react-jsonschema-form schema definition wrapped in function so related collections can be passed',
    },
    uiSchema: {
      title: 'UI Schema',
      type: 'string',
      description: 'react-jsonschema-form ui schema definition wrapped in a function to pass any params needed for custom handling',
    },
    columnDefinitions: {
      title: 'Column Definitions',
      type: 'string',
      description: 'react-table column definitions wrapped in a function to pass any params needed for custom handling',
    },
    stateChart: {
      title: 'State Charts',
      type: 'string',
      description: 'State charts for handling flows',
    },
    relationShips: {
      title: 'Relationships',
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'State Charts ',
    },
  },
};

