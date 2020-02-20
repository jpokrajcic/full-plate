import {call, put} from 'redux-saga/effects';
import getBuildingTasks from '../../../services/task/getBuildingTasks';
import {
  getBuildingTasksSuccess,
  getBuildingTasksFailed
} from '../../actionCreators/TaskActionCreators';

function* getBuildingTasksGen({payload}) {
  try {
    const tasks = yield call(getBuildingTasks, payload);
    yield put(getBuildingTasksSuccess(tasks));
  } catch (error) {
    yield put(getBuildingTasksFailed(error));
  }
}
export default getBuildingTasksGen;
