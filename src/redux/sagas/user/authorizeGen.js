import {call, put} from 'redux-saga/effects';
import {
  authorizeFailed,
  authorizeSuccess
} from '../../actionCreators/UserActionCreators';
import authorize from '../../../services/user/authorize';

function* authorizeGen({payload}) {
  try {
    const sessionToken = yield call(authorize, payload);
    localStorage.setItem('token', sessionToken);
    yield put(authorizeSuccess(sessionToken));
  } catch (error) {
    localStorage.removeItem('token');
    yield put(authorizeFailed(error));
  }
}
export default authorizeGen;
