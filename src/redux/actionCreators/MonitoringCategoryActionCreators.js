import {
  GET_BUILDING_MONITORING_CATEGORIES,
  CREATE_MONITORING_CATEGORY,
  UPDATE_MONITORING_CATEGORY,
  DELETE_MONITORING_CATEGORY,
  GET_BUILDING_MONITORING_CATEGORIES_SUCCESS,
  GET_BUILDING_MONITORING_CATEGORIES_FAILURE,
  CREATE_MONITORING_CATEGORY_SUCCESS,
  CREATE_MONITORING_CATEGORY_FAILURE,
  UPDATE_MONITORING_CATEGORY_SUCCESS,
  UPDATE_MONITORING_CATEGORY_FAILURE,
  DELETE_MONITORING_CATEGORY_SUCCESS,
  DELETE_MONITORING_CATEGORY_FAILURE
} from '../actionTypes';

export const getBuildingMonitoringCategories = data => {
  return {type: GET_BUILDING_MONITORING_CATEGORIES, payload: data};
};

export const getBuildingMonitoringCategoriesSuccess = data => {
  return {type: GET_BUILDING_MONITORING_CATEGORIES_SUCCESS, payload: data};
};

export const getBuildingMonitoringCategoriesFailed = error => {
  return {type: GET_BUILDING_MONITORING_CATEGORIES_FAILURE, payload: error};
};

export const createMonitoringCategory = data => {
  return {type: CREATE_MONITORING_CATEGORY, payload: data};
};

export const createMonitoringCategorySuccess = data => {
  return {type: CREATE_MONITORING_CATEGORY_SUCCESS, payload: data};
};

export const createMonitoringCategoryFailed = error => {
  return {type: CREATE_MONITORING_CATEGORY_FAILURE, payload: error};
};

export const updateMonitoringCategory = data => {
  return {type: UPDATE_MONITORING_CATEGORY, payload: data};
};

export const updateMonitoringCategorySuccess = data => {
  return {type: UPDATE_MONITORING_CATEGORY_SUCCESS, payload: data};
};

export const updateMonitoringCategoryFailed = error => {
  return {type: UPDATE_MONITORING_CATEGORY_FAILURE, payload: error};
};

export const deleteMonitoringCategory = data => {
  return {type: DELETE_MONITORING_CATEGORY, payload: data};
};

export const deleteMonitoringCategorySuccess = data => {
  return {type: DELETE_MONITORING_CATEGORY_SUCCESS, payload: data};
};

export const deleteMonitoringCategoryFailed = error => {
  return {type: DELETE_MONITORING_CATEGORY_FAILURE, payload: error};
};
