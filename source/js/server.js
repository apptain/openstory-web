import 'babel-polyfill';
import 'isomorphic-fetch';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import transit from 'transit-immutable-js';

import configureStore from 'store/store.server.js';
import getServerHtml from 'components/server/ServerHTML';
import App from 'App';

import { getStoriesServer } from 'redux/sagas/storySaga';

// Load SCSS
import '../scss/app.scss';

const app = express();
const hostname = 'localhost';
const port = 7000;

const clientPort = 9090;

import path from 'path';
import webpack from 'webpack';

import clientRenderConfig from '../../webpack.config.dev';
const clientCompiler = webpack(clientRenderConfig);

// ENV
const IS_DEVELOPMENT = app.get('env') === 'development';

// Disabling "Powered by" headers
app.disable('x-powered-by');

// Telling server to serve our client app build as static assets
app.use('/client', express.static('build/client'));


function sendResponse(req, res, store) {
  // Dehydrates the state
  // Serialize then another stringify to escape it
  const dehydratedState = JSON.stringify(transit.toJSON(store.getState()));

  // Context is passed to the StaticRouter and it will attach data to it directly
  const context = {};

  // Before sending the request app is rendered to a string
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={ store }>
      <StaticRouter location={ req.url } context={ context }>
        <App />
      </StaticRouter>
    </Provider>
  );

  // Adds rest of the HTML page
  const serverHtml = getServerHtml(appHtml, dehydratedState);

  // Context has url, which means `<Redirect>` was rendered somewhere
  if (context.url) {
    res.redirect(301, context.url);
  } else {
    // We're good, send the response
    res.status(context.status || 200).send(serverHtml);
  }
}

// This method will wait for all sagas to be finished
// and async data stored to a reducer before sending the response.
// If there are no sagas or sagas fail, it will return response without async data.
function handleRequest(req, res, sagas = null, sagaArgs = {}) {
  // Creates empty store for each request
  const config = configureStore(sagas, sagaArgs);

  if (config.tasks) {
    const tasksEndPromises = config.tasks.map(task => task.done);

    // Wait for all saga tasks to finish
    Promise.all(tasksEndPromises).then(() => {
      config.tasks.forEach(task => {
        config.store.dispatch(task.result());
      });

      sendResponse(req, res, config.store);
    }).catch(error => {
      console.log(error); // eslint-disable-line no-console
      sendResponse(req, res, config.store);
    });
  } else {
    sendResponse(req, res, config.store);
  }
}

// Specific routes which need to fetch async data on the server
// pass two additional params to "handleRequest"
// array of sagas which should be completed
// and object containing saga's options (usually req.params)
// app.get('/', (req, res) => {
//   handleRequest(req, res, [getStoriesServer]);
// });

// app.use(require('webpack-dev-middleware')(clientCompiler, {
//   noInfo: true,
//   publicPath: clientRenderConfig.output.publicPath
// }));

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve('build-client-render/index.html'));
});

// All other routes
app.use((req, res) => {
  handleRequest(req, res);
});

// Error handling
app.use((error, req, res) => {
  res.status(error.status || 500);

  res.render('error', {
    message: error.message,
    // Display stack trace only in development mode
    error: IS_DEVELOPMENT ? error : null,
  });
});

// Start listening
app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`\n★★ Listening on port ${ port }. Open up http://${ hostname }:${ port }/ in your browser.\n`); // eslint-disable-line
  }
});
