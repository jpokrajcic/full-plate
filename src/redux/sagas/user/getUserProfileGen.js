import {put, call} from 'redux-saga/effects';
import getUserProfile from '../../../services/user/getUserProfile';
import {
  getUserProfileSuccess,
  getUserProfileFailed
} from '../../actionCreators/UserActionCreators';

function* getUserProfileGen() {
  try {
    const userProfile = yield call(getUserProfile);
    yield put(getUserProfileSuccess, userProfile);
  } catch (error) {
    yield put(getUserProfileFailed(error));
  }
}

export default getUserProfileGen;
