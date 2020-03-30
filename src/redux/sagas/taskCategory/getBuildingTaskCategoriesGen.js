import {call, put} from 'redux-saga/effects';
import getBuildingTaskCategories from '../../../services/taskCategory/getBuildingTaskCategories';
import {
  getBuildingTaskCategoriesSuccess,
  getBuildingTaskCategoriesFailed
} from '../../actionCreators/TaskCategoryActionCreators';

function* getBuildingTaskCategoriesGen({payload: {data}}) {
  try {
    const tasks = yield call(getBuildingTaskCategories, data);
    yield put(getBuildingTaskCategoriesSuccess(tasks));
  } catch (error) {
    yield put(getBuildingTaskCategoriesFailed(error));
  }
}
export default getBuildingTaskCategoriesGen;
