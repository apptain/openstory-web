import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Menu from 'components/global/menu';
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

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className='App'>
        <Grid container spacing={24}>
         <Grid item xs={6}>
           <Menu />
         </Grid>
          <Grid item xs={18}>
            <div className='Page'>
              <Switch>
                <Route exact path={ routeCodes.HOME } component={ Home } />
                {/*TODO Authenticate Routes*/}
                <Route path={ routeCodes.ACCOUNT_NEW } component={ AccountForm } />
                <Route path={ routeCodes.ACCOUNT_EDIT } component={ AccountForm } />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(hot(module)(App));
