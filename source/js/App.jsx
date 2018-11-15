import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Home from 'containers/Home';
import Login from 'containers/Login';
import LoginFacebook from 'containers/LoginFacebook';
import LoginTwitter from 'containers/LoginTwitter';
import StoryForm from 'containers/StoryForm';
import StoryView from 'containers/StoryView';
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
            <Route path='/story/:id' component={ StoryView } />
            <Route path={ `${routeCodes.STORY_FORM}/:id` } component={ StoryForm } />
            <Route exact path={ routeCodes.LOGIN_FACEBOOK } component={ LoginFacebook } />
            <Route exact path={ routeCodes.LOGIN_TWITTER } component={ LoginTwitter } />
            <Route path='*' component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
