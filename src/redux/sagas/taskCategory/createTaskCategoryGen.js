import {call, put} from 'redux-saga/effects';
import {
  createTaskCategorySuccess,
  createTaskCategoryFailed
} from '../../actionCreators/TaskCategoryActionCreators';
import createTaskCategory from '../../../services/taskCategory/createTaskCategory';

function* createTaskCategoryGen({payload: {data}}) {
  try {
    const taskCategory = yield call(createTaskCategory, {data});
    yield put(createTaskCategorySuccess(taskCategory));
  } catch (error) {
    yield put(createTaskCategoryFailed(error));
  }
}
export default createTaskCategoryGen;
