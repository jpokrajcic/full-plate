import {call, put} from 'redux-saga/effects';
import {
  updateTaskSuccess,
  updateTaskFailed
} from '../../actionCreators/TaskActionCreators';
import updateTask from '../../../services/task/updateTask';

function* updateTaskGen({payload}) {
  try {
    const task = yield call(updateTask, payload);
    yield put(updateTaskSuccess(task));
  } catch (error) {
    yield put(updateTaskFailed(error));
  }
}
export default updateTaskGen;
