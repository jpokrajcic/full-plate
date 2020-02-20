import {call, put} from 'redux-saga/effects';
import {
  getTaskCategoriesSuccess,
  getTaskCategoriesFailed
} from '../../actionCreators/TaskCategoryActionCreators';
import getTaskCategories from '../../../services/taskCategory/getTaskCategories';

function* getTaskCategoriesGen() {
  try {
    const tasks = yield call(getTaskCategories);
    yield put(getTaskCategoriesSuccess(tasks));
  } catch (error) {
    yield put(getTaskCategoriesFailed(error));
  }
}
export default getTaskCategoriesGen;
