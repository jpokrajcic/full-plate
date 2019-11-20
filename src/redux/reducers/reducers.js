import {combineReducers} from 'redux';
import buildingReducer from './BuildingReducer';
import apartmentReducer from './ApartmentReducer';
import taskReducer from './TaskReducer';
import messageReducer from './MessageReducer';
import monitoringReducer from './MonitoringReducer';
import taskCategoryReducer from './TaskCategoryReducer';
import monitoringCategoryReducer from './MonitoringCategoryReducer';

const rootReducer = combineReducers({
  building: buildingReducer,
  apartment: apartmentReducer,
  task: taskReducer,
  message: messageReducer,
  monitoring: monitoringReducer,
  taskCategory: taskCategoryReducer,
  monitoringCategory: monitoringCategoryReducer
});

export default rootReducer;
