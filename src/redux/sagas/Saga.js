import {takeLatest} from 'redux-saga/effects';
import {AUTH_REQUEST, GET_BUILDING_TASK_CATEGORIES} from '../actionTypes';
import {
  GET_BUILDINGS,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  DELETE_BUILDING
} from '../actionTypes/BuildingActionTypes';
import {
  GET_BUILDING_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from '../actionTypes/TaskActionTypes';
import {
  GET_BUILDING_APARTMENTS,
  UPDATE_APARTMENT,
  CREATE_APARTMENT,
  DELETE_APARTMENT
} from '../actionTypes/ApartmentActionTypes';
import {
  GET_BUILDING_MESSAGES,
  GET_APARTMENT_MESSAGES
} from '../actionTypes/MessageActionTypes';
import {
  GET_USER_PROFILE_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  AUTH_LOGOUT
} from '../actionTypes/UserActionTypes';
import {
  GET_TASK_CATEGORIES,
  CREATE_TASK_CATEGORY,
  UPDATE_TASK_CATEGORY,
  DELETE_TASK_CATEGORY
} from '../actionTypes/TaskCategoryActionTypes';
import authorizeGen from './user/authorizeGen';
import getBuildingsGen from './building/getBuildingsGen';
import getBuildingTasksGen from './task/getBuildingTasksGen';
import getBuildingApartmentsGen from './apartment/getBuildingApartmentsGen';
import getBuildingMessagesGen from './message/getBuildingMessagesGen';
import getUserProfileGen from './user/getUserProfileGen';
import changePasswordGen from './user/changePasswordGen';
import logoutGen from './user/logoutGen';
import createBuildingGen from './building/createBuildingGen';
import updateBuildingGen from './building/updateBuildingGen';
import deleteBuildingGen from './building/deleteBuildingGen';
import createTaskGen from './task/createTaskGen';
import updateTaskGen from './task/updateTaskGen';
import deleteTaskGen from './task/deleteTaskGen';
import createApartmentGen from './apartment/createApartmentGen';
import updateApartmentGen from './apartment/updateApartmentGen';
import deleteApartmentGen from './apartment/deleteApartmentGen';
import getApartmentMessagesGen from './message/getApartmentMessagesGen';
import getBuildingTaskCategoriesGen from './taskCategory/getBuildingTaskCategoriesGen';
import getTaskCategoriesGen from './taskCategory/getTaskCategoriesGen';
import createTaskCategoryGen from './taskCategory/createTaskCategoryGen';
import updateTaskCategoryGen from './taskCategory/updateTaskCategoryGen';
import deleteTaskCategoryGen from './taskCategory/deleteTaskCategoryGen';

function* Saga() {
  yield takeLatest(AUTH_REQUEST, authorizeGen);
  yield takeLatest(GET_USER_PROFILE_REQUEST, getUserProfileGen);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordGen);
  yield takeLatest(AUTH_LOGOUT, logoutGen);

  yield takeLatest(GET_BUILDINGS, getBuildingsGen);
  yield takeLatest(CREATE_BUILDING, createBuildingGen);
  yield takeLatest(UPDATE_BUILDING, updateBuildingGen);
  yield takeLatest(DELETE_BUILDING, deleteBuildingGen);

  yield takeLatest(GET_BUILDING_TASKS, getBuildingTasksGen);
  yield takeLatest(CREATE_TASK, createTaskGen);
  yield takeLatest(UPDATE_TASK, updateTaskGen);
  yield takeLatest(DELETE_TASK, deleteTaskGen);

  yield takeLatest(GET_BUILDING_APARTMENTS, getBuildingApartmentsGen);
  yield takeLatest(CREATE_APARTMENT, createApartmentGen);
  yield takeLatest(UPDATE_APARTMENT, updateApartmentGen);
  yield takeLatest(DELETE_APARTMENT, deleteApartmentGen);

  yield takeLatest(GET_BUILDING_MESSAGES, getBuildingMessagesGen);
  yield takeLatest(GET_APARTMENT_MESSAGES, getApartmentMessagesGen);
  yield takeLatest(CREATE_APARTMENT, createApartmentGen);
  yield takeLatest(UPDATE_APARTMENT, updateApartmentGen);
  yield takeLatest(DELETE_APARTMENT, deleteApartmentGen);

  yield takeLatest(GET_BUILDING_TASK_CATEGORIES, getBuildingTaskCategoriesGen);
  yield takeLatest(GET_TASK_CATEGORIES, getTaskCategoriesGen);
  yield takeLatest(CREATE_TASK_CATEGORY, createTaskCategoryGen);
  yield takeLatest(UPDATE_TASK_CATEGORY, updateTaskCategoryGen);
  yield takeLatest(DELETE_TASK_CATEGORY, deleteTaskCategoryGen);
}

export default Saga;
