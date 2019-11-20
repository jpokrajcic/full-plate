import {
  GET_BUILDING_MONITORINGS,
  GET_BUILDING_MONITORINGS_SUCCESS,
  GET_BUILDING_MONITORINGS_FAILED,
  CREATE_MONITORING,
  CREATE_MONITORING_SUCCESS,
  CREATE_MONITORING_FAILED,
  UPDATE_MONITORING,
  UPDATE_MONITORING_SUCCESS,
  UPDATE_MONITORING_FAILED,
  DELETE_MONITORING,
  DELETE_MONITORING_SUCCESS,
  DELETE_MONITORING_FAILED,
  GET_BUILDING_AND_CATEGORY_MONITORINGS,
  GET_BUILDING_AND_CATEGORY_MONITORINGS_SUCCESS,
  GET_BUILDING_AND_CATEGORY_MONITORINGS_FAILED
} from '../actionTypes';

const initState = {
  isLoading: true,
  monitorings: [],
  selectedMonitoring: null
};

const monitoringReducer = (state = initState, action) => {
  switch (action.type) {
    // TODO vidi kako cu strukturirat monitorings polje i dal se treba razbit na vise polja
    case GET_BUILDING_MONITORINGS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDING_MONITORINGS_SUCCESS: {
      return {
        ...state,
        monitorings: action.data,
        isLoading: false
      };
    }
    case GET_BUILDING_MONITORINGS_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }
    case GET_BUILDING_AND_CATEGORY_MONITORINGS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDING_AND_CATEGORY_MONITORINGS_SUCCESS: {
      return {
        ...state,
        monitorings: action.data,
        isLoading: false
      };
    }
    case GET_BUILDING_AND_CATEGORY_MONITORINGS_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CREATE_MONITORING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CREATE_MONITORING_SUCCESS: {
      return {
        ...state,
        monitorings: [...state.monitorings, action.data],
        isLoading: false
      };
    }
    case CREATE_MONITORING_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_MONITORING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UPDATE_MONITORING_SUCCESS: {
      return {
        ...state,
        monitorings: state.monitorings.map(monitoring => {
          if (monitoring.id === action.data.id) {
            return {...action.data};
          }
          return monitoring;
        }),
        isLoading: true
      };
    }
    case UPDATE_MONITORING_FAILED: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_MONITORING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_MONITORING_SUCCESS: {
      return {
        ...state,
        monitorings: state.monitorings.filter(
          monitoring => monitoring.id !== action.data
        ),
        isLoading: false
      };
    }
    case DELETE_MONITORING_FAILED: {
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

export default monitoringReducer;
