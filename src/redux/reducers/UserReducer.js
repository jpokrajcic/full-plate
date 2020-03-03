import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from '../actionTypes';

const initState = {
  isLoading: true,
  sessionToken: null,
  isAuthenticated: false,
  userProfile: {},
  error: ''
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        sessionToken: action.payload,
        isLoading: false
      };
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        sessionToken: '',
        isAuthenticated: false,
        userProfile: {},
        isLoading: false
      };
    }
    case AUTH_LOGOUT_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case GET_USER_PROFILE_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfile: action.payload,
        isLoading: false
      };
    }
    case GET_USER_PROFILE_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
