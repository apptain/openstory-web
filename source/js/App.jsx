import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Home from 'containers/Home';
import Login from 'containers/Login';
import NotFound from 'components/NotFound';
import '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='Page'>
          <Switch>
            <Route exact path={ routeCodes.HOME } component={ Home } />
            <Route exact path={ routeCodes.LOGIN } component={ Login } />
            <Route path='*' component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
