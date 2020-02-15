import {call, put} from 'redux-saga/effects';
import {
  getTaskCategoriesSuccess,
  getTaskCategoriesFailed
} from '../../actionCreators/TaskCategoryActionCreators';
import getTaskCategories from '../../../services/taskCategory/getTaskCategories';

function* getTaskCategoriesGen({payload: {data}}) {
  try {
    const tasks = yield call(getTaskCategories, data);
    yield put(getTaskCategoriesSuccess(tasks));
  } catch (error) {
    yield put(getTaskCategoriesFailed(error));
  }
}
export default getTaskCategoriesGen;
