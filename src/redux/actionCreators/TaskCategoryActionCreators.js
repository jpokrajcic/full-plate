import {
  GET_TASK_CATEGORIES,
  GET_BUILDING_TASK_CATEGORIES,
  CREATE_TASK_CATEGORY,
  UPDATE_TASK_CATEGORY,
  DELETE_TASK_CATEGORY,
  GET_TASK_CATEGORIES_SUCCESS,
  GET_TASK_CATEGORIES_FAILURE,
  GET_BUILDING_TASK_CATEGORIES_SUCCESS,
  GET_BUILDING_TASK_CATEGORIES_FAILURE,
  CREATE_TASK_CATEGORY_SUCCESS,
  CREATE_TASK_CATEGORY_FAILURE,
  UPDATE_TASK_CATEGORY_SUCCESS,
  UPDATE_TASK_CATEGORY_FAILURE,
  DELETE_TASK_CATEGORY_SUCCESS,
  DELETE_TASK_CATEGORY_FAILURE
} from '../actionTypes';

export const getTaskCategories = data => {
  return {type: GET_TASK_CATEGORIES, payload: data};
};

export const getTaskCategoriesSuccess = data => {
  return {type: GET_TASK_CATEGORIES_SUCCESS, payload: data};
};

export const getTaskCategoriesFailed = error => {
  return {type: GET_TASK_CATEGORIES_FAILURE, payload: error};
};

export const getBuildingTaskCategories = data => {
  return {type: GET_BUILDING_TASK_CATEGORIES, payload: data};
};

export const getBuildingTaskCategoriesSuccess = data => {
  return {type: GET_BUILDING_TASK_CATEGORIES_SUCCESS, payload: data};
};

export const getBuildingTaskCategoriesFailed = error => {
  return {type: GET_BUILDING_TASK_CATEGORIES_FAILURE, payload: error};
};

export const createTaskCategory = data => {
  return {type: CREATE_TASK_CATEGORY, payload: data};
};

export const createTaskCategorySuccess = data => {
  return {type: CREATE_TASK_CATEGORY_SUCCESS, payload: data};
};

export const createTaskCategoryFailed = error => {
  return {type: CREATE_TASK_CATEGORY_FAILURE, payload: error};
};

export const updateTaskCategory = data => {
  return {type: UPDATE_TASK_CATEGORY, payload: data};
};

export const updateTaskCategorySuccess = data => {
  return {type: UPDATE_TASK_CATEGORY_SUCCESS, payload: data};
};

export const updateTaskCategoryFailed = error => {
  return {type: UPDATE_TASK_CATEGORY_FAILURE, payload: error};
};

export const deleteTaskCategory = data => {
  return {type: DELETE_TASK_CATEGORY, payload: data};
};

export const deleteTaskCategorySuccess = data => {
  return {type: DELETE_TASK_CATEGORY_SUCCESS, payload: data};
};

export const deleteTaskCategoryFailed = error => {
  return {type: DELETE_TASK_CATEGORY_FAILURE, payload: error};
};
