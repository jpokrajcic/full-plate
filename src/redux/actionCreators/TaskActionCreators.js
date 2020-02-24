import {
  GET_BUILDING_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATUS,
  GET_BUILDING_TASKS_SUCCESS,
  GET_BUILDING_TASKS_FAILURE,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  CHANGE_TASK_STATUS_SUCCESS,
  CHANGE_TASK_STATUS_FAILURE,
  CLEAN_UP_EDITOR_ERRORS
} from '../actionTypes';

export const getBuildingTasks = data => {
  return {type: GET_BUILDING_TASKS, payload: data};
};

export const getBuildingTasksSuccess = data => {
  return {type: GET_BUILDING_TASKS_SUCCESS, payload: data};
};

export const getBuildingTasksFailed = error => {
  return {type: GET_BUILDING_TASKS_FAILURE, payload: error};
};

export const createTask = data => {
  return {type: CREATE_TASK, payload: data};
};

export const createTaskSuccess = data => {
  return {type: CREATE_TASK_SUCCESS, payload: data};
};

export const createTaskFailed = error => {
  return {type: CREATE_TASK_FAILURE, payload: error};
};

export const updateTask = data => {
  return {type: UPDATE_TASK, payload: data};
};

export const updateTaskSuccess = data => {
  return {type: UPDATE_TASK_SUCCESS, payload: data};
};

export const updateTaskFailed = error => {
  return {type: UPDATE_TASK_FAILURE, payload: error};
};

export const deleteTask = data => {
  return {type: DELETE_TASK, payload: data};
};

export const deleteTaskSuccess = data => {
  return {type: DELETE_TASK_SUCCESS, payload: data};
};

export const deleteTaskFailed = error => {
  return {type: DELETE_TASK_FAILURE, payload: error};
};

export const changeTaskStatus = data => {
  return {type: CHANGE_TASK_STATUS, payload: data};
};

export const changeTaskStatusSuccess = data => {
  return {type: CHANGE_TASK_STATUS_SUCCESS, payload: data};
};

export const changeTaskStatusFailed = error => {
  return {type: CHANGE_TASK_STATUS_FAILURE, payload: error};
};

export const cleanUpEditorErrors = () => {
  return {type: CLEAN_UP_EDITOR_ERRORS, payload: {}};
};
