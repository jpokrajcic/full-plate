import {
  GET_BUILDING_MONITORINGS,
  GET_BUILDING_MONITORINGS_SUCCESS,
  GET_BUILDING_MONITORINGS_FAILURE,
  CREATE_MONITORING,
  CREATE_MONITORING_SUCCESS,
  CREATE_MONITORING_FAILURE,
  UPDATE_MONITORING,
  UPDATE_MONITORING_SUCCESS,
  UPDATE_MONITORING_FAILURE,
  DELETE_MONITORING,
  DELETE_MONITORING_SUCCESS,
  DELETE_MONITORING_FAILURE,
  GET_BUILDING_AND_CATEGORY_MONITORINGS,
  GET_BUILDING_AND_CATEGORY_MONITORINGS_SUCCESS,
  GET_BUILDING_AND_CATEGORY_MONITORINGS_FAILURE
} from '../actionTypes';

const initState = {
  isLoading: true,
  monitorings: [],
  selectedMonitoring: null
};

const MonitoringReducer = (state = initState, action) => {
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
        monitorings: action.payload,
        isLoading: false
      };
    }
    case GET_BUILDING_MONITORINGS_FAILURE: {
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
        monitorings: action.payload,
        isLoading: false
      };
    }
    case GET_BUILDING_AND_CATEGORY_MONITORINGS_FAILURE: {
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
        monitorings: [...state.monitorings, action.payload],
        isLoading: false
      };
    }
    case CREATE_MONITORING_FAILURE: {
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
          if (monitoring.id === action.payload.id) {
            return {...action.payload};
          }
          return monitoring;
        }),
        isLoading: true
      };
    }
    case UPDATE_MONITORING_FAILURE: {
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
          monitoring => monitoring.id !== action.payload
        ),
        isLoading: false
      };
    }
    case DELETE_MONITORING_FAILURE: {
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

export default MonitoringReducer;
