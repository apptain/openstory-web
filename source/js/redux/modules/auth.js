export const LOAD = 'openstory/auth/LOAD';
export const LOAD_SUCCESS = 'openstory/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'openstory/auth/LOAD_FAIL';
export const LOGIN = 'openstory/auth/LOGIN';
export const LOGIN_SUCCESS = 'openstory/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'openstory/auth/LOGIN_FAIL';
export const LOGOUT = 'openstory/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'openstory/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'openstory/auth/LOGOUT_FAIL';

//These OAUTH_LOGIN actions look very REST like; but
//are manually used with RCTLinking to show
//Linking open; close with session in callback; or close manually for fail
export const OAUTH_LOGIN_REQUESTED = "OAUTH_LOGIN_REQUESTED";
export const OAUTH_LOGIN_SUCCESS = "OAUTH_LOGIN_SUCCESS";
  //if they close out
export const OAUTH_LOGIN_FAILURE = "OAUTH_LOGIN_FAILURE";

  // PROFILE_GET= "PROFILE_GET";
export const PROFILE_GET_REQUEST = "PROFILE_GET_REQUEST";
export const PROFILE_GET_SUCCESS = "PROFILE_GET_SUCCESS";
export const PROFILE_GET_FAILURE = "PROFILE_GET_FAILURE";

const initialState = {
  isLoggingIn: false,
  jwt: null,
  profile: null,
  user: null,
  isGettingProfile: false,
  gettingProfileError: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OAUTH_LOGIN_REQUESTED:
      return { ...state,
        isLoggingInWithProvider : {...state.isLoggingInWithProvider, [action.provider]: true},
        loginError: null
      };
    case OAUTH_LOGIN_SUCCESS:
      return { ...state,
        isLoggingInWithProvider: {...state.isLoggingInWithProvider, [action.provider]: false},
        loginError: null,
        jwt: action.jwt
      };
    case OAUTH_LOGIN_FAILURE:
      return { ...state,
        isLoggingInWithProvider : {...state.isLoggingInWithProvider, [action.provider]: false},
        loginError: action.error
      };
    case PROFILE_GET_REQUEST:
      return { ...state, isGettingProfile: true, gettingProfileError: null};
    case PROFILE_GET_SUCCESS:
      return { ...state,
        isGettingProfile: false,
        gettingProfileError: null,
        user: action.me,
        session: action.session
      };
    case PROFILE_GET_FAILURE:
      return { ...state, isGettingProfile: false, gettingProfileError: action.error};
    default:
      return state
  }
};

export const profileGet = (apiCall, jwt) => {
  return {type: actionKeys.auth.PROFILE_GET_REQUEST, apiCall, jwt};
};

export const oAuthLoginRequested = (provider) => {
  return {type: actionKeys.auth.OAUTH_LOGIN_REQUESTED};
};

export const oAuthLoginSuccess = (jwt, provider) => {
  //TODO action has double duty to a saga and directly to a reducer, separate
  return {type: actionKeys.auth.OAUTH_LOGIN_SUCCESS, jwt, provider};
};
