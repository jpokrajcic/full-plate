import {call, put} from 'redux-saga/effects';
import {
  updateMessageSuccess,
  updateMessageFailed
} from '../../actionCreators/MessageActionCreators';
import updateMessage from '../../../services/message/updateMessage';

function* updateMessageGen({payload}) {
  try {
    const message = yield call(updateMessage, payload);
    yield put(updateMessageSuccess(message));
  } catch (error) {
    yield put(updateMessageFailed(error));
  }
}
export default updateMessageGen;
