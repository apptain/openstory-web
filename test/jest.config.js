const jestConfig = require('kcd-scripts/jest')

module.exports = Object.assign(jestConfig, {
  rootDir: __dirname,
  roots: [__dirname],
  displayName: 'openstory-web',
  moduleNameMapper: {
    // this is just here so our examples look like they would in a real project
    'react-testing-library': require.resolve('../source'),
  },
})
