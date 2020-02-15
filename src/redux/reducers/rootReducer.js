import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import BuildingReducer from './BuildingReducer';
import ApartmentReducer from './ApartmentReducer';
import TaskReducer from './TaskReducer';
import MessageReducer from './MessageReducer';
import MonitoringReducer from './MonitoringReducer';
import TaskCategoryReducer from './TaskCategoryReducer';
import MonitoringCategoryReducer from './MonitoringCategoryReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  buildingReducer: BuildingReducer,
  apartmentReducer: ApartmentReducer,
  taskReducer: TaskReducer,
  messageReducer: MessageReducer,
  monitoringReducer: MonitoringReducer,
  taskCategoryReducer: TaskCategoryReducer,
  monitoringCategoryReducer: MonitoringCategoryReducer
});

export default rootReducer;
