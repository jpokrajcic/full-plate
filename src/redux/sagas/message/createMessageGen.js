import {call, put} from 'redux-saga/effects';
import {
  createMessageSuccess,
  createMessageFailed
} from '../../actionCreators/MessageActionCreators';
import createMessage from '../../../services/message/createMessage';

function* createMessageGen({payload: {data}}) {
  try {
    const message = yield call(createMessage, {data});
    yield put(createMessageSuccess(message));
  } catch (error) {
    yield put(createMessageFailed(error));
  }
}
export default createMessageGen;
