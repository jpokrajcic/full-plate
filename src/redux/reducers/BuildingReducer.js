import {
  GET_BUILDINGS,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_FAILURE,
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
  buildings: [],
  selectedBuilding: null,
  loadingError: '',
  editorError: '',
  deletionError: ''
};

const BuildingReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDINGS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDINGS_SUCCESS: {
      return {
        ...state,
        buildings: action.payload,
        isLoading: false
      };
    }
    case GET_BUILDINGS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loadingError: action.payload.error
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
        buildings: [...state.buildings, action.payload],
        isLoading: false
      };
    }
    case CREATE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: false,
        editorError: action.payload.error
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
        buildings: state.buildings.map(building => {
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
        isLoading: true,
        editorError: action.payload.error
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
        buildings: state.buildings.filter(
          building => building.id !== action.payload
        ),
        isLoading: false
      };
    }
    case DELETE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: false,
        deletionError: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
};

export default BuildingReducer;
