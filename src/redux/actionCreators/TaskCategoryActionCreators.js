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
  DELETE_TASK_CATEGORY_FAILURE,
  CLEAN_UP_TASK_CATEGORY_ERRORS
} from '../actionTypes';

export const getTaskCategories = data => ({
  type: GET_TASK_CATEGORIES,
  payload: data
});

export const getTaskCategoriesSuccess = data => ({
  type: GET_TASK_CATEGORIES_SUCCESS,
  payload: data
});

export const getTaskCategoriesFailed = error => ({
  type: GET_TASK_CATEGORIES_FAILURE,
  payload: error
});

export const getBuildingTaskCategories = data => ({
  type: GET_BUILDING_TASK_CATEGORIES,
  payload: data
});

export const getBuildingTaskCategoriesSuccess = data => ({
  type: GET_BUILDING_TASK_CATEGORIES_SUCCESS,
  payload: data
});

export const getBuildingTaskCategoriesFailed = error => ({
  type: GET_BUILDING_TASK_CATEGORIES_FAILURE,
  payload: error
});

export const createTaskCategory = data => ({
  type: CREATE_TASK_CATEGORY,
  payload: data
});

export const createTaskCategorySuccess = data => ({
  type: CREATE_TASK_CATEGORY_SUCCESS,
  payload: data
});

export const createTaskCategoryFailed = error => ({
  type: CREATE_TASK_CATEGORY_FAILURE,
  payload: error
});

export const updateTaskCategory = data => ({
  type: UPDATE_TASK_CATEGORY,
  payload: data
});

export const updateTaskCategorySuccess = data => ({
  type: UPDATE_TASK_CATEGORY_SUCCESS,
  payload: data
});

export const updateTaskCategoryFailed = error => ({
  type: UPDATE_TASK_CATEGORY_FAILURE,
  payload: error
});

export const deleteTaskCategory = data => ({
  type: DELETE_TASK_CATEGORY,
  payload: data
});

export const deleteTaskCategorySuccess = data => ({
  type: DELETE_TASK_CATEGORY_SUCCESS,
  payload: data
});

export const deleteTaskCategoryFailed = error => ({
  type: DELETE_TASK_CATEGORY_FAILURE,
  payload: error
});

export const cleanUpTaskCategoryErrors = () => ({
  type: CLEAN_UP_TASK_CATEGORY_ERRORS,
  payload: {}
});
