import {call, put} from 'redux-saga/effects';
import {
  updateBuildingSuccess,
  updateBuildingFailed
} from '../../actionCreators/BuildingActionCreators';
import updateBuilding from '../../../services/building/updateBuilding';

function* updateBuildingGen({payload: {data}}) {
  try {
    const building = yield call(updateBuilding, {data});
    yield put(updateBuildingSuccess(building));
  } catch (error) {
    yield put(updateBuildingFailed(error));
  }
}
export default updateBuildingGen;
