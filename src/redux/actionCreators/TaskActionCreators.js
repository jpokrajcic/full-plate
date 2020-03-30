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
  CLEAN_UP_TASK_ERRORS
} from '../actionTypes';

export const getBuildingTasks = data => ({
  type: GET_BUILDING_TASKS,
  payload: data
});

export const getBuildingTasksSuccess = data => ({
  type: GET_BUILDING_TASKS_SUCCESS,
  payload: data
});

export const getBuildingTasksFailed = error => ({
  type: GET_BUILDING_TASKS_FAILURE,
  payload: error
});

export const createTask = data => ({type: CREATE_TASK, payload: data});

export const createTaskSuccess = data => ({
  type: CREATE_TASK_SUCCESS,
  payload: data
});

export const createTaskFailed = error => ({
  type: CREATE_TASK_FAILURE,
  payload: error
});

export const updateTask = data => ({type: UPDATE_TASK, payload: data});

export const updateTaskSuccess = data => ({
  type: UPDATE_TASK_SUCCESS,
  payload: data
});

export const updateTaskFailed = error => ({
  type: UPDATE_TASK_FAILURE,
  payload: error
});

export const deleteTask = data => ({type: DELETE_TASK, payload: data});

export const deleteTaskSuccess = data => ({
  type: DELETE_TASK_SUCCESS,
  payload: data
});

export const deleteTaskFailed = error => ({
  type: DELETE_TASK_FAILURE,
  payload: error
});

export const changeTaskStatus = data => ({
  type: CHANGE_TASK_STATUS,
  payload: data
});

export const changeTaskStatusSuccess = data => ({
  type: CHANGE_TASK_STATUS_SUCCESS,
  payload: data
});

export const changeTaskStatusFailed = error => ({
  type: CHANGE_TASK_STATUS_FAILURE,
  payload: error
});

export const cleanUpTaskErrors = () => ({
  type: CLEAN_UP_TASK_ERRORS,
  payload: {}
});
