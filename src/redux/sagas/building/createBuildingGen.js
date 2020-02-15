import {call, put} from 'redux-saga/effects';
import {
  createBuildingSuccess,
  createBuildingFailed
} from '../../actionCreators/BuildingActionCreators';
import createBuilding from '../../../services/building/createBuilding';

function* createBuildingGen({payload: {data}}) {
  try {
    const building = yield call(createBuilding, {data});
    yield put(createBuildingSuccess(building));
  } catch (error) {
    yield put(createBuildingFailed(error));
  }
}
export default createBuildingGen;
