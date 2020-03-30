import {call, put} from 'redux-saga/effects';
import getBuildings from '../../../services/building/getBuildings';
import {
  getBuildingsSuccess,
  getBuildingsFailed
} from '../../actionCreators/BuildingActionCreators';

function* getBuildingsGen() {
  try {
    const buildings = yield call(getBuildings);
    yield put(getBuildingsSuccess(buildings));
  } catch (error) {
    yield put(getBuildingsFailed(error));
  }
}
export default getBuildingsGen;
