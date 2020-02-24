import {call, put} from 'redux-saga/effects';
import {
  createTaskSuccess,
  createTaskFailed
} from '../../actionCreators/TaskActionCreators';
import createTask from '../../../services/task/createTask';

function* createTaskGen({payload}) {
  try {
    const task = yield call(createTask, payload);
    yield put(createTaskSuccess(task));
  } catch (error) {
    yield put(createTaskFailed(error));
  }
}
export default createTaskGen;
