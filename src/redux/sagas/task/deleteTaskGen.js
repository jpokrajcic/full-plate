import {call, put} from 'redux-saga/effects';
import {
  deleteTaskSuccess,
  deleteTaskFailed
} from '../../actionCreators/TaskActionCreators';
import deleteTask from '../../../services/task/deleteTask';

function* deleteTaskGen({payload}) {
  try {
    const deletedTaskId = yield call(deleteTask, payload);
    yield put(deleteTaskSuccess(deletedTaskId));
  } catch (error) {
    yield put(deleteTaskFailed(error));
  }
}
export default deleteTaskGen;
