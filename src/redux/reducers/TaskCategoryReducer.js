import {
  GET_TASK_CATEGORIES,
  GET_TASK_CATEGORIES_SUCCESS,
  GET_TASK_CATEGORIES_FAILURE,
  GET_BUILDING_TASK_CATEGORIES,
  GET_BUILDING_TASK_CATEGORIES_SUCCESS,
  GET_BUILDING_TASK_CATEGORIES_FAILURE,
  CLEAN_UP_TASK_CATEGORY_ERRORS
} from '../actionTypes';

const initState = {
  isLoading: true,
  taskCategories: [],
  loadingError: ''
};

const TaskCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TASK_CATEGORIES: {
      return {
        ...state,
        isLoading: true,
        loadingError: ''
      };
    }
    case GET_TASK_CATEGORIES_SUCCESS: {
      return {
        ...state,
        taskCategories: action.payload,
        isLoading: false,
        loadingError: ''
      };
    }
    case GET_TASK_CATEGORIES_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loadingError: 'Failed loading task categories'
      };
    }
    case GET_BUILDING_TASK_CATEGORIES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDING_TASK_CATEGORIES_SUCCESS: {
      return {
        ...state,
        taskCategories: action.payload,
        isLoading: false
      };
    }
    case GET_BUILDING_TASK_CATEGORIES_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CLEAN_UP_TASK_CATEGORY_ERRORS: {
      return {
        ...state,
        loadingError: ''
      };
    }
    default: {
      return state;
    }
  }
};

export default TaskCategoryReducer;
