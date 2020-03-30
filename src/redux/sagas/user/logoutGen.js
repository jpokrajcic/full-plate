import {call, put} from 'redux-saga/effects';
import logout from '../../../services/user/logout';
import {
  logoutSuccess,
  logoutFailed
} from '../../actionCreators/UserActionCreators';

function* logoutGen() {
  try {
    yield call(logout);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailed(error));
  }
}

export default logoutGen;
