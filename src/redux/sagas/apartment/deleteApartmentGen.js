import {call, put} from 'redux-saga/effects';
import {
  deleteApartmentSuccess,
  deleteApartmentFailed
} from '../../actionCreators/ApartmentActionCreators';
import deleteApartment from '../../../services/apartment/deleteApartment';

function* deleteApartmentGen({payload: {data}}) {
  try {
    const deletedApartmentId = yield call(deleteApartment, {data});
    yield put(deleteApartmentSuccess(deletedApartmentId));
  } catch (error) {
    yield put(deleteApartmentFailed(error));
  }
}
export default deleteApartmentGen;
