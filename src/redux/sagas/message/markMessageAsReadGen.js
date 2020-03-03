import {call, put} from 'redux-saga/effects';
import {
  markMessageAsReadSuccess,
  markMessageAsReadFailed
} from '../../actionCreators/MessageActionCreators';
import markMessageAsRead from '../../../services/message/markMessageAsRead';

function* markMessageAsReadGen({payload}) {
  try {
    const markedMessageId = yield call(markMessageAsRead, payload);
    yield put(markMessageAsReadSuccess(markedMessageId));
  } catch (error) {
    yield put(markMessageAsReadFailed(error));
  }
}
export default markMessageAsReadGen;
