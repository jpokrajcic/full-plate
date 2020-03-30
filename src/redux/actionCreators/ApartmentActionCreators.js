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
  DELETE_APARTMENT_FAILURE,
  CLEAN_UP_APARTMENT_ERRORS
} from '../actionTypes';

export const getBuildingApartments = data => ({
  type: GET_BUILDING_APARTMENTS,
  payload: data
});

export const getBuildingApartmentsSuccess = data => ({
  type: GET_BUILDING_APARTMENTS_SUCCESS,
  payload: data
});

export const getBuildingApartmentsFailed = error => ({
  type: GET_BUILDING_APARTMENTS_FAILURE,
  payload: error
});

export const createApartment = data => ({
  type: CREATE_APARTMENT,
  payload: data
});

export const createApartmentSuccess = data => ({
  type: CREATE_APARTMENT_SUCCESS,
  payload: data
});

export const createApartmentFailed = error => ({
  type: CREATE_APARTMENT_FAILURE,
  payload: error
});

export const updateApartment = data => ({
  type: UPDATE_APARTMENT,
  payload: data
});

export const updateApartmentSuccess = data => ({
  type: UPDATE_APARTMENT_SUCCESS,
  payload: data
});

export const updateApartmentFailed = error => ({
  type: UPDATE_APARTMENT_FAILURE,
  payload: error
});

export const deleteApartment = data => ({
  type: DELETE_APARTMENT,
  payload: data
});

export const deleteApartmentSuccess = data => ({
  type: DELETE_APARTMENT_SUCCESS,
  payload: data
});

export const deleteApartmentFailed = error => ({
  type: DELETE_APARTMENT_FAILURE,
  payload: error
});

export const cleanUpApartmentErrors = () => ({
  type: CLEAN_UP_APARTMENT_ERRORS,
  payload: {}
});
