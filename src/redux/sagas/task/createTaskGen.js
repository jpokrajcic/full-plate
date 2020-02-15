import {call, put} from 'redux-saga/effects';
import {
  createTaskSuccess,
  createTaskFailed
} from '../../actionCreators/TaskActionCreators';
import createTask from '../../../services/task/createTask';

function* createTaskGen({payload: {data}}) {
  try {
    const task = yield call(createTask, {data});
    yield put(createTaskSuccess(task));
  } catch (error) {
    yield put(createTaskFailed(error));
  }
}
export default createTaskGen;
