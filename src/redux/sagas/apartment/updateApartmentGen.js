import {call, put} from 'redux-saga/effects';
import {
  updateApartmentSuccess,
  updateApartmentFailed
} from '../../actionCreators/ApartmentActionCreators';
import updateApartment from '../../../services/apartment/updateApartment';

function* updateApartmentGen({payload}) {
  try {
    // const apartment = yield call(updateApartment, payload);
    // yield put(updateApartmentSuccess(apartment));
    yield put(updateApartmentFailed('error'));
  } catch (error) {
    yield put(updateApartmentFailed(error));
  }
}
export default updateApartmentGen;
