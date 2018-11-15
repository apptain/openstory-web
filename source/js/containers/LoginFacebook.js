import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('facebook', facebookLoginUrl);

  // Handle Login with Twitter button tap
  loginWithTwitter = () => this.openURL('twitter', twitterLoginUrl);

  // Open URL in a browser
  openURL = (provider, url) => {
    this.setState({
      selectedProvider: provider
    });
  };

  render() {
    return (
      <div className="container">
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
      </div>
    );
  }
}
