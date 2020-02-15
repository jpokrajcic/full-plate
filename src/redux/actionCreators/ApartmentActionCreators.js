import {
  GET_BUILDING_APARTMENTS,
  CREATE_APARTMENT,
  UPDATE_APARTMENT,
  DELETE_APARTMENT,
  GET_BUILDING_APARTMENTS_SUCCESS,
  GET_BUILDING_APARTMENTS_FAILURE,
  CREATE_APARTMENT_SUCCESS,
  CREATE_APARTMENT_FAILURE,
  UPDATE_APARTMENT_SUCCESS,
  UPDATE_APARTMENT_FAILURE,
  DELETE_APARTMENT_SUCCESS,
  DELETE_APARTMENT_FAILURE
} from '../actionTypes';

export const getBuildingApartments = data => {
  return {type: GET_BUILDING_APARTMENTS, payload: data};
};

export const getBuildingApartmentsSuccess = data => {
  return {type: GET_BUILDING_APARTMENTS_SUCCESS, payload: data};
};

export const getBuildingApartmentsFailed = error => {
  return {type: GET_BUILDING_APARTMENTS_FAILURE, payload: error};
};

export const createApartment = data => {
  return {type: CREATE_APARTMENT, payload: data};
};

export const createApartmentSuccess = data => {
  return {type: CREATE_APARTMENT_SUCCESS, payload: data};
};

export const createApartmentFailed = error => {
  return {type: CREATE_APARTMENT_FAILURE, payload: error};
};

export const updateApartment = data => {
  return {type: UPDATE_APARTMENT, payload: data};
};

export const updateApartmentSuccess = data => {
  return {type: UPDATE_APARTMENT_SUCCESS, payload: data};
};

export const updateApartmentFailed = error => {
  return {type: UPDATE_APARTMENT_FAILURE, payload: error};
};

export const deleteApartment = data => {
  return {type: DELETE_APARTMENT, payload: data};
};

export const deleteApartmentSuccess = data => {
  return {type: DELETE_APARTMENT_SUCCESS, payload: data};
};

export const deleteApartmentFailed = error => {
  return {type: DELETE_APARTMENT_FAILURE, payload: error};
};
