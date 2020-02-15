import {call, put} from 'redux-saga/effects';
import getBuildingMessages from '../../../services/message/getBuildingMessages';
import {
  getBuildingMessagesSuccess,
  getBuildingMessagesFailed
} from '../../actionCreators/MessageActionCreators';

function* getBuildingMessagesGen({payload: {data}}) {
  try {
    const messages = yield call(getBuildingMessages, data);
    yield put(getBuildingMessagesSuccess(messages));
  } catch (error) {
    yield put(getBuildingMessagesFailed(error));
  }
}
export default getBuildingMessagesGen;
