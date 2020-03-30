import {call, put} from 'redux-saga/effects';
import {
  deleteApartmentSuccess,
  deleteApartmentFailed
} from '../../actionCreators/ApartmentActionCreators';
import deleteApartment from '../../../services/apartment/deleteApartment';

function* deleteApartmentGen({payload}) {
  try {
    const deletedApartmentId = yield call(deleteApartment, payload);
    yield put(deleteApartmentSuccess(deletedApartmentId));
  } catch (error) {
    yield put(deleteApartmentFailed(error));
  }
}
export default deleteApartmentGen;
