import {call, put} from 'redux-saga/effects';
import {
  updateTaskCategorySuccess,
  updateTaskCategoryFailed
} from '../../actionCreators/TaskCategoryActionCreators';
import updateTaskCategory from '../../../services/taskCategory/updateTaskCategory';

function* updateTaskCategoryGen({payload: {data}}) {
  try {
    const taskCategory = yield call(updateTaskCategory, {data});
    yield put(updateTaskCategorySuccess(taskCategory));
  } catch (error) {
    yield put(updateTaskCategoryFailed(error));
  }
}
export default updateTaskCategoryGen;
