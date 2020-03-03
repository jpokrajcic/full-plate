import {call, put} from 'redux-saga/effects';
import getBuildingMessages from '../../../services/message/getBuildingMessages';
import {
  getBuildingMessagesSuccess,
  getBuildingMessagesFailed
} from '../../actionCreators/MessageActionCreators';

function* getBuildingMessagesGen({payload}) {
  try {
    const messages = yield call(getBuildingMessages, payload);
    yield put(getBuildingMessagesSuccess(messages));
  } catch (error) {
    yield put(getBuildingMessagesFailed(error));
  }
}
export default getBuildingMessagesGen;
