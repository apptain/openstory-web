import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'inline-source-map',

  entry: [
    path.resolve('source/js/src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'source/js/src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
    ]
  }

}
