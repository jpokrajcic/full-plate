import {call, put} from 'redux-saga/effects';
import {
  updateMessageSuccess,
  updateMessageFailed
} from '../../actionCreators/MessageActionCreators';
import updateMessage from '../../../services/message/updateMessage';

function* updateMessageGen({payload: {data}}) {
  try {
    const message = yield call(updateMessage, {data});
    yield put(updateMessageSuccess(message));
  } catch (error) {
    yield put(updateMessageFailed(error));
  }
}
export default updateMessageGen;
