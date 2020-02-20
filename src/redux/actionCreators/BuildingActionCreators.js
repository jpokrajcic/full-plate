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
  DELETE_BUILDING_FAILURE
} from '../actionTypes';

export const getBuildings = data => {
  return {type: GET_BUILDINGS, payload: {data}};
};

export const getBuildingsSuccess = data => {
  return {type: GET_BUILDINGS_SUCCESS, payload: data};
};

export const getBuildingsFailed = error => {
  return {type: GET_BUILDINGS_FAILURE, payload: error};
};

export const createBuilding = data => {
  return {type: CREATE_BUILDING, payload: data};
};

export const createBuildingSuccess = data => {
  return {type: CREATE_BUILDING_SUCCESS, payload: data};
};

export const createBuildingFailed = error => {
  return {type: CREATE_BUILDING_FAILURE, payload: error};
};

export const updateBuilding = data => {
  return {type: UPDATE_BUILDING, payload: data};
};

export const updateBuildingSuccess = data => {
  return {type: UPDATE_BUILDING_SUCCESS, payload: data};
};

export const updateBuildingFailed = error => {
  return {type: UPDATE_BUILDING_FAILURE, payload: error};
};

export const deleteBuilding = data => {
  return {type: DELETE_BUILDING, payload: data};
};

export const deleteBuildingSuccess = data => {
  return {type: DELETE_BUILDING_SUCCESS, payload: data};
};

export const deleteBuildingFailed = error => {
  return {type: DELETE_BUILDING_FAILURE, payload: error};
};
