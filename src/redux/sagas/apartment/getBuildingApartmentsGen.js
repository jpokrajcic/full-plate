import {call, put} from 'redux-saga/effects';
import getBuildingApartments from '../../../services/apartment/getBuildingApartments';
import {
  getBuildingApartmentsSuccess,
  getBuildingApartmentsFailed
} from '../../actionCreators/ApartmentActionCreators';

function* getBuildingApartmentsGen({payload}) {
  try {
    const apartments = yield call(getBuildingApartments, payload);
    yield put(getBuildingApartmentsSuccess(apartments));
  } catch (error) {
    yield put(getBuildingApartmentsFailed(error));
  }
}
export default getBuildingApartmentsGen;
