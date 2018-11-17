export default () => {
  return {
    type: 'object',
    title: 'Login',
    required: ['email', 'password'],
    properties: {
      email: {
        title: 'Email',
        type: 'string'
      },
      password: {
        title: 'Password',
        type: 'string'
      }
    }
  }
}


