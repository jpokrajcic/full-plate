import {call, put} from 'redux-saga/effects';
import {
  createApartmentSuccess,
  createApartmentFailed
} from '../../actionCreators/ApartmentActionCreators';
import createApartment from '../../../services/apartment/createApartment';

function* createApartmentGen({payload}) {
  try {
    const apartment = yield call(createApartment, payload);
    yield put(createApartmentSuccess(apartment));
  } catch (error) {
    yield put(createApartmentFailed(error));
  }
}
export default createApartmentGen;
