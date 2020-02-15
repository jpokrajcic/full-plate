import {call, put} from 'redux-saga/effects';
import {
  deleteMessageSuccess,
  deleteMessageFailed
} from '../../actionCreators/MessageActionCreators';
import deleteMessage from '../../../services/message/deleteMessage';

function* deleteMessageGen({payload: {data}}) {
  try {
    const deletedMessageId = yield call(deleteMessage, {data});
    yield put(deleteMessageSuccess(deletedMessageId));
  } catch (error) {
    yield put(deleteMessageFailed(error));
  }
}
export default deleteMessageGen;
