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
  payload: data
});

export const authorizeSuccess = data => ({type: AUTH_SUCCESS, payload: data});

export const authorizeFailed = error => ({type: AUTH_FAILURE, payload: error});

export const logout = () => ({type: AUTH_LOGOUT, payload: {}});

export const logoutSuccess = () => ({type: AUTH_LOGOUT_SUCCESS, payload: {}});

export const logoutFailed = error => ({
  type: AUTH_LOGOUT_FAILURE,
  payload: error
});

export const getUserProfile = () => ({
  type: GET_USER_PROFILE_REQUEST,
  payload: {}
});

export const getUserProfileSuccess = data => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: data
});

export const getUserProfileFailed = error => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: error
});

export const changePassword = data => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: data
});

export const changePasswordSuccess = data => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: data
});
export const changePasswordFailed = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error
});
