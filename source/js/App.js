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
import AccountForm from 'containers/domain/account';
import '@material-ui/core/CssBaseline';
import {publicPath} from "./constants/routes";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='Page'>
          <Switch>
            <Route exact path={ routeCodes.HOME } component={ Home } />

            <Route path={ routeCodes.ACCOUNT_NEW } component={ AccountForm } />
            <Route path={ routeCodes.ACCOUNT_EDIT } component={ AccountForm } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);

// LOGIN_FACEBOOK: `${ publicPath }login/facebook`,
//   LOGIN_TWITTER: `${ publicPath }login/twitter`,
//   PROFILE: `${ publicPath }profile`,
//   STORY_VIEW: `${ publicPath }story/:id`,
//   STORY_FORM: `${ publicPath }story/create`,
//   STORY_EDIT: `${ publicPath }story/edit/:id`,
