import authorTypeSelectionSchema from './authorTypeSelectionSchema';
import contactInfoSchema from './contactInfoSchema';

export default function () {
  return {
    type: 'object',
    title: ' ',
    required: [],
    properties: {
      contactInfo: {
        properties: contactInfoSchema().properties,
      },
      authorType: {
        properties: authorTypeSelectionSchema().properties,
      },
    },
  };
};
