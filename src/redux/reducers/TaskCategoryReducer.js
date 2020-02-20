import {
  GET_TASK_CATEGORIES,
  GET_TASK_CATEGORIES_SUCCESS,
  GET_TASK_CATEGORIES_FAILURE,
  GET_BUILDING_TASK_CATEGORIES,
  GET_BUILDING_TASK_CATEGORIES_SUCCESS,
  GET_BUILDING_TASK_CATEGORIES_FAILURE,
  CREATE_BUILDING,
  CREATE_BUILDING_SUCCESS,
  CREATE_BUILDING_FAILURE,
  UPDATE_BUILDING,
  UPDATE_BUILDING_SUCCESS,
  UPDATE_BUILDING_FAILURE,
  DELETE_BUILDING,
  DELETE_BUILDING_SUCCESS,
  DELETE_BUILDING_FAILURE
} from '../actionTypes';

const initState = {
  isLoading: true,
  taskCategories: []
};

const TaskCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TASK_CATEGORIES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_TASK_CATEGORIES_SUCCESS: {
      return {
        ...state,
        taskCategories: action.payload,
        isLoading: false
      };
    }
    case GET_TASK_CATEGORIES_FAILURE: {
      return {
        ...state,
        isLoading: false
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
    case CREATE_BUILDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CREATE_BUILDING_SUCCESS: {
      return {
        ...state,
        taskCategories: [...state.taskCategories, action.payload],
        isLoading: false
      };
    }
    case CREATE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_BUILDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UPDATE_BUILDING_SUCCESS: {
      return {
        ...state,
        taskCategories: state.taskCategories.map(building => {
          if (building.id === action.payload.id) {
            return {...action.payload};
          }
          return building;
        }),
        isLoading: true
      };
    }
    case UPDATE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_BUILDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_BUILDING_SUCCESS: {
      return {
        ...state,
        taskCategories: state.taskCategories.filter(
          building => building.id !== action.payload
        ),
        isLoading: false
      };
    }
    case DELETE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};

export default TaskCategoryReducer;
