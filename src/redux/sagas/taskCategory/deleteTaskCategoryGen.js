import {call, put} from 'redux-saga/effects';
import {
  deleteTaskCategorySuccess,
  deleteTaskCategoryFailed
} from '../../actionCreators/TaskCategoryActionCreators';
import deleteTaskCategory from '../../../services/taskCategory/deleteTaskCategory';

function* deleteTaskCategoryGen({payload: {data}}) {
  try {
    const deletedTaskCategoryId = yield call(deleteTaskCategory, {data});
    yield put(deleteTaskCategorySuccess(deletedTaskCategoryId));
  } catch (error) {
    yield put(deleteTaskCategoryFailed(error));
  }
}
export default deleteTaskCategoryGen;
