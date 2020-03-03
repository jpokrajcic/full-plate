import {
  GET_BUILDING_MESSAGES,
  GET_APARTMENT_MESSAGES,
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  GET_BUILDING_MESSAGES_SUCCESS,
  GET_BUILDING_MESSAGES_FAILURE,
  GET_APARTMENT_MESSAGES_SUCCESS,
  GET_APARTMENT_MESSAGES_FAILURE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  UPDATE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_FAILURE,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
  MARK_MESSAGE_AS_READ,
  MARK_MESSAGE_AS_READ_SUCCESS,
  MARK_MESSAGE_AS_READ_FAILURE,
  CLEAN_UP_ERRORS
} from '../actionTypes';

export const getBuildingMessages = data => {
  return {type: GET_BUILDING_MESSAGES, payload: data};
};

export const getBuildingMessagesSuccess = data => {
  return {type: GET_BUILDING_MESSAGES_SUCCESS, payload: data};
};

export const getBuildingMessagesFailed = error => {
  return {type: GET_BUILDING_MESSAGES_FAILURE, payload: error};
};

export const getApartmentMessages = data => {
  return {type: GET_APARTMENT_MESSAGES, payload: data};
};

export const getApartmentMessagesSuccess = data => {
  return {type: GET_APARTMENT_MESSAGES_SUCCESS, payload: data};
};

export const getApartmentMessagesFailed = error => {
  return {type: GET_APARTMENT_MESSAGES_FAILURE, payload: error};
};

export const createMessage = data => {
  return {type: CREATE_MESSAGE, payload: data};
};

export const createMessageSuccess = data => {
  return {type: CREATE_MESSAGE_SUCCESS, payload: data};
};

export const createMessageFailed = error => {
  return {type: CREATE_MESSAGE_FAILURE, payload: error};
};

export const updateMessage = data => {
  return {type: UPDATE_MESSAGE, payload: data};
};

export const updateMessageSuccess = data => {
  return {type: UPDATE_MESSAGE_SUCCESS, payload: data};
};

export const updateMessageFailed = error => {
  return {type: UPDATE_MESSAGE_FAILURE, payload: error};
};

export const deleteMessage = data => {
  return {type: DELETE_MESSAGE, payload: data};
};

export const deleteMessageSuccess = data => {
  return {type: DELETE_MESSAGE_SUCCESS, payload: data};
};

export const deleteMessageFailed = error => {
  return {type: DELETE_MESSAGE_FAILURE, payload: error};
};

export const markMessageAsRead = data => {
  return {type: MARK_MESSAGE_AS_READ, payload: data};
};

export const markMessageAsReadSuccess = data => {
  return {type: MARK_MESSAGE_AS_READ_SUCCESS, payload: data};
};

export const markMessageAsReadFailed = error => {
  return {type: MARK_MESSAGE_AS_READ_FAILURE, payload: error};
};

export const cleanUpMessageErrors = () => {
  console.log('juhuuuuuu');
  return {type: CLEAN_UP_ERRORS, payload: {}};
};
