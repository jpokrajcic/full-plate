import {call, put} from 'redux-saga/effects';
import {
  updateApartmentSuccess,
  updateApartmentFailed
} from '../../actionCreators/ApartmentActionCreators';
import updateApartment from '../../../services/apartment/updateApartment';

function* updateApartmentGen({payload: {data}}) {
  try {
    const apartment = yield call(updateApartment, {data});
    yield put(updateApartmentSuccess(apartment));
  } catch (error) {
    yield put(updateApartmentFailed(error));
  }
}
export default updateApartmentGen;
