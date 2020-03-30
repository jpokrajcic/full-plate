import {
  GET_BUILDINGS,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  DELETE_BUILDING,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_FAILURE,
  CREATE_BUILDING_SUCCESS,
  CREATE_BUILDING_FAILURE,
  UPDATE_BUILDING_SUCCESS,
  UPDATE_BUILDING_FAILURE,
  DELETE_BUILDING_SUCCESS,
  DELETE_BUILDING_FAILURE,
  CLEAN_UP_BUILDING_ERRORS
} from '../actionTypes';

export const getBuildings = data => ({type: GET_BUILDINGS, payload: {data}});

export const getBuildingsSuccess = data => ({
  type: GET_BUILDINGS_SUCCESS,
  payload: data
});

export const getBuildingsFailed = error => ({
  type: GET_BUILDINGS_FAILURE,
  payload: error
});

export const createBuilding = data => ({type: CREATE_BUILDING, payload: data});

export const createBuildingSuccess = data => ({
  type: CREATE_BUILDING_SUCCESS,
  payload: data
});

export const createBuildingFailed = error => ({
  type: CREATE_BUILDING_FAILURE,
  payload: error
});

export const updateBuilding = data => ({type: UPDATE_BUILDING, payload: data});

export const updateBuildingSuccess = data => ({
  type: UPDATE_BUILDING_SUCCESS,
  payload: data
});

export const updateBuildingFailed = error => ({
  type: UPDATE_BUILDING_FAILURE,
  payload: error
});

export const deleteBuilding = data => ({type: DELETE_BUILDING, payload: data});

export const deleteBuildingSuccess = data => ({
  type: DELETE_BUILDING_SUCCESS,
  payload: data
});

export const deleteBuildingFailed = error => ({
  type: DELETE_BUILDING_FAILURE,
  payload: error
});

export const cleanUpBuildingErrors = () => ({
  type: CLEAN_UP_BUILDING_ERRORS,
  payload: {}
});
