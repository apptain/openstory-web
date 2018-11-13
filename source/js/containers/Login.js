import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { facebookLoginUrl, twitterLoginUrl } from '../apiCalls/endpoints';

import '../../scss/app.scss';

@connect(state => ({
  counter: state.app.get('counter'),
}))
export default class Login extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  state = {
    selectedProvider: null
  };

  // // Set up Linking
  //   // componentDidMount() {
  //   //   // Add event listener to handle OAuthLogin:// URLs
  //   //   Linking.addEventListener('url', this.handleOpenURL);
  //   //   // Launched from an external URL
  //   //   Linking.getInitialURL().then((url) => {
  //   //     if (url) {
  //   //       this.handleOpenURL({ url });
  //   //     }
  //   //   });
  //   //
  //   //   const oauthScript = document.createElement("script");
  //   //   oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
  //   //
  //   //   document.body.appendChild(oauthScript);
  //   // };

  // componentWillUnmount() {
  //   // Remove event listener
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // };
  //
  // handleOpenURL = ({url}) => {
  //   // Extract stringified user string out of the URL
  //   const [, token] = url.match(/token=([^#]+)/);
  //   this.props.oAuthLoginSuccess(token, this.state.selectedProvider);
  //   if (Platform.OS === 'ios') {
  //     SafariView.dismiss();
  //   }
  // };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('facebook', facebookLoginUrl);

  // Handle Login with Twitter button tap
  loginWithTwitter = () => this.openURL('twitter', twitterLoginUrl);

  // Open URL in a browser
  openURL = (provider, url) => {

    this.setState({
      selectedProvider: provider
    });
    //this.props.oAuthLoginRequested(provider);
  };

  render() {
    $('#login-form-link').click(function(e) {
      $("#login-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-6">
                    <a href="#" className="active" id="login-form-link">Login</a>
                  </div>
                  <div className="col-xs-6">
                    <a href="#" id="register-form-link">Register</a>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <form id="login-form" action="https://phpoll.com/login/process" method="post" role="form">
                      <div className="form-group">
                        <input type="text" name="username" id="username" tabIndex="1" className="form-control"
                               placeholder="Username" value="" />
                      </div>
                      <div className="form-group">
                        <input type="password" name="password" id="password" tabIndex="2" className="form-control"
                               placeholder="Password" />
                      </div>
                      <div className="form-group text-center">
                        <input type="checkbox" tabIndex="3" className="" name="remember" id="remember"/>
                          <label htmlFor="remember"> Remember Me</label>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-sm-6 col-sm-offset-3">
                            <input type="submit" name="login-submit" id="login-submit" tabIndex="4"
                                   className="form-control btn btn-login" value="Log In"/>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-center">
                              <a href="https://phpoll.com/recover" tabIndex="5" className="forgot-password">Forgot
                                Password?</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <form id="register-form" action="https://phpoll.com/register/process" method="post" role="form">
                      <h3>
                        OpenStory uses Twitter and Facebook authentication to tell the story so far
                      </h3>
                      <h4>
                        Please select one of these login options.
                      </h4>
                      <div>
                        <FontAwesomeIcon
                          icon={faFacebook}
                          onPress={this.loginWithFacebook}>
                          Login with Facebook
                        </FontAwesomeIcon>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={faTwitter}
                          onPress={this.loginWithTwitter}>
                          Login with Twitter
                        </FontAwesomeIcon>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
