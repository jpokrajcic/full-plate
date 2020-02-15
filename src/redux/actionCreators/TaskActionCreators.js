import {
  GET_BUILDING_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_BUILDING_TASKS_SUCCESS,
  GET_BUILDING_TASKS_FAILURE,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE
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
