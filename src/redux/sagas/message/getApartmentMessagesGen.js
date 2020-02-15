import {call, put} from 'redux-saga/effects';
import getApartmentMessages from '../../../services/message/getApartmentMessages';
import {
  getApartmentMessagesSuccess,
  getApartmentMessagesFailed
} from '../../actionCreators/MessageActionCreators';

function* getApartmentMessagesGen({payload: {data}}) {
  try {
    const messages = yield call(getApartmentMessages, data);
    yield put(getApartmentMessagesSuccess(messages));
  } catch (error) {
    yield put(getApartmentMessagesFailed(error));
  }
}
export default getApartmentMessagesGen;
