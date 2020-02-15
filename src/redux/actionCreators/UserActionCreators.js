import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  GET_USER_PROFILE_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from '../actionTypes';

export const authorize = data => ({
  type: AUTH_REQUEST,
  payload: {data}
});

export const authorizeSuccess = data => {
  return {type: AUTH_SUCCESS, payload: data};
};

export const authorizeFailed = error => {
  return {type: AUTH_FAILURE, payload: error};
};

export const logout = () => {
  return {type: AUTH_LOGOUT, payload: {}};
};

export const logoutSuccess = () => {
  return {type: AUTH_LOGOUT_SUCCESS, payload: {}};
};

export const logoutFailed = error => {
  return {type: AUTH_LOGOUT_FAILURE, payload: error};
};

export const getUserProfile = () => {
  return {type: GET_USER_PROFILE_REQUEST, payload: {}};
};

export const getUserProfileSuccess = data => {
  return {type: GET_USER_PROFILE_SUCCESS, payload: data};
};

export const getUserProfileFailed = error => {
  return {type: GET_USER_PROFILE_FAILURE, payload: error};
};

export const changePassword = data => {
  return {type: CHANGE_PASSWORD_REQUEST, payload: data};
};

export const changePasswordSuccess = data => {
  return {type: CHANGE_PASSWORD_SUCCESS, payload: data};
};

export const changePasswordFailed = error => {
  return {type: CHANGE_PASSWORD_FAILURE, payload: error};
};
