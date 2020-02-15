import {call, put} from 'redux-saga/effects';
import {
  deleteBuildingSuccess,
  deleteBuildingFailed
} from '../../actionCreators/BuildingActionCreators';
import deleteBuilding from '../../../services/building/deleteBuilding';

function* deleteBuildingGen({payload: {data}}) {
  try {
    const deletedBuildingId = yield call(deleteBuilding, {data});
    yield put(deleteBuildingSuccess(deletedBuildingId));
  } catch (error) {
    yield put(deleteBuildingFailed(error));
  }
}
export default deleteBuildingGen;
