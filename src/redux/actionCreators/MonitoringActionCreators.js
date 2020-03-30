import {
  GET_BUILDING_MONITORINGS,
  GET_BUILDING_AND_CATEGORY_MONITORINGS,
  CREATE_MONITORING,
  UPDATE_MONITORING,
  DELETE_MONITORING,
  GET_BUILDING_MONITORINGS_SUCCESS,
  GET_BUILDING_MONITORINGS_FAILURE,
  GET_BUILDING_AND_CATEGORY_MONITORINGS_SUCCESS,
  GET_BUILDING_AND_CATEGORY_MONITORINGS_FAILURE,
  CREATE_MONITORING_SUCCESS,
  CREATE_MONITORING_FAILURE,
  UPDATE_MONITORING_SUCCESS,
  UPDATE_MONITORING_FAILURE,
  DELETE_MONITORING_SUCCESS,
  DELETE_MONITORING_FAILURE
} from '../actionTypes';

export const getBuildingMonitorings = data => {
  return {type: GET_BUILDING_MONITORINGS, payload: data};
};

export const getBuildingMonitoringsSuccess = data => {
  return {type: GET_BUILDING_MONITORINGS_SUCCESS, payload: data};
};

export const getBuildingMonitoringsFailed = error => {
  return {type: GET_BUILDING_MONITORINGS_FAILURE, payload: error};
};

export const getBuildingAndCategoryMonitorings = data => {
  return {type: GET_BUILDING_AND_CATEGORY_MONITORINGS, payload: data};
};

export const getBuildingAndCategoryMonitoringsSuccess = data => {
  return {type: GET_BUILDING_AND_CATEGORY_MONITORINGS_SUCCESS, payload: data};
};

export const getBuildingAndCategoryMonitoringsFailed = error => {
  return {type: GET_BUILDING_AND_CATEGORY_MONITORINGS_FAILURE, payload: error};
};

export const createMonitoring = data => {
  return {type: CREATE_MONITORING, payload: data};
};

export const createMonitoringSuccess = data => {
  return {type: CREATE_MONITORING_SUCCESS, payload: data};
};

export const createMonitoringFailed = error => {
  return {type: CREATE_MONITORING_FAILURE, payload: error};
};

export const updateMonitoring = data => {
  return {type: UPDATE_MONITORING, payload: data};
};

export const updateMonitoringSuccess = data => {
  return {type: UPDATE_MONITORING_SUCCESS, payload: data};
};

export const updateMonitoringFailed = error => {
  return {type: UPDATE_MONITORING_FAILURE, payload: error};
};

export const deleteMonitoring = data => {
  return {type: DELETE_MONITORING, payload: data};
};

export const deleteMonitoringSuccess = data => {
  return {type: DELETE_MONITORING_SUCCESS, payload: data};
};

export const deleteMonitoringFailed = error => {
  return {type: DELETE_MONITORING_FAILURE, payload: error};
};
