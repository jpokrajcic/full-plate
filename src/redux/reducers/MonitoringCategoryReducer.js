import {
  GET_BUILDING_MONITORING_CATEGORIES,
  GET_BUILDING_MONITORING_CATEGORIES_SUCCESS,
  GET_BUILDING_MONITORING_CATEGORIES_FAILED,
  CREATE_MONITORING_CATEGORY,
  CREATE_MONITORING_CATEGORY_SUCCESS,
  CREATE_MONITORING_CATEGORY_FAILED,
  UPDATE_MONITORING_CATEGORY,
  UPDATE_MONITORING_CATEGORY_SUCCESS,
  UPDATE_MONITORING_CATEGORY_FAILED,
  DELETE_MONITORING_CATEGORY,
  DELETE_MONITORING_CATEGORY_SUCCESS,
  DELETE_MONITORING_CATEGORY_FAILED
} from '../actionTypes';

const initState = {
  isLoading: true,
  monitoringCategories: [],
  selectedMonitoringCategory: null
};

const monitoringCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDING_MONITORING_CATEGORIES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDING_MONITORING_CATEGORIES_SUCCESS: {
      return {
        ...state,
        monitoringCategories: action.data,
        isLoading: false
      };
    }
    case GET_BUILDING_MONITORING_CATEGORIES_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CREATE_MONITORING_CATEGORY: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CREATE_MONITORING_CATEGORY_SUCCESS: {
      return {
        ...state,
        monitoringCategories: [...state.monitoringCategories, action.data],
        isLoading: false
      };
    }
    case CREATE_MONITORING_CATEGORY_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_MONITORING_CATEGORY: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UPDATE_MONITORING_CATEGORY_SUCCESS: {
      return {
        ...state,
        monitoringCategories: state.monitoringCategories.map(
          monitoringCategory => {
            if (monitoringCategory.id === action.data.id) {
              return {...action.data};
            }
            return monitoringCategory;
          }
        ),
        isLoading: true
      };
    }
    case UPDATE_MONITORING_CATEGORY_FAILED: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_MONITORING_CATEGORY: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_MONITORING_CATEGORY_SUCCESS: {
      return {
        ...state,
        monitoringCategories: state.monitoringCategories.filter(
          monitoringCategory => monitoringCategory.id !== action.data
        ),
        isLoading: false
      };
    }
    case DELETE_MONITORING_CATEGORY_FAILED: {
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

export default monitoringCategoryReducer;
