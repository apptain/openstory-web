export default function () {
  return {
    'title': 'A registration form',
    'description': 'A simple form example.',
    'type': 'object',
    'required': [
      'firstName',
      'lastName',
    ],
    'properties': {
      'authorType': {
        'type': 'string',
        'title': 'Author Type',
      },
    },
  };
}

