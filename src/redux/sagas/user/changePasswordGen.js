import {call, put} from 'redux-saga/effects';
import {
  changePassword,
  changePasswordSuccess,
  changePasswordFailed
} from '../../actionCreators/UserActionCreators';

function* changePasswordGen({payload: {data}}) {
  try {
    yield call(changePassword, data);
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordFailed(error));
  }
}
export default changePasswordGen;
