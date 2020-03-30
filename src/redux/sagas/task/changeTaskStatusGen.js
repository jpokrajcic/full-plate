import {call, put} from 'redux-saga/effects';
import {
  changeTaskStatusSuccess,
  changeTaskStatusFailed
} from '../../actionCreators/TaskActionCreators';
import changeTaskStatus from '../../../services/task/changeTaskStatus';

function* changeTaskStatusGen({payload}) {
  try {
    const task = yield call(changeTaskStatus, payload);
    yield put(changeTaskStatusSuccess(task));
  } catch (error) {
    yield put(changeTaskStatusFailed(error));
  }
}
export default changeTaskStatusGen;
