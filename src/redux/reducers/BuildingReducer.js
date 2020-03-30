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
  DELETE_BUILDING_FAILURE,
  CLEAN_UP_BUILDING_ERRORS
} from '../actionTypes';

const initState = {
  isLoading: true,
  buildings: [],
  selectedBuilding: null,
  loadingError: '',
  createError: '',
  updateError: '',
  deleteError: ''
};

const BuildingReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDINGS: {
      return {
        ...state,
        isLoading: true,
        loadingError: ''
      };
    }
    case GET_BUILDINGS_SUCCESS: {
      return {
        ...state,
        buildings: action.payload,
        isLoading: false,
        loadingError: ''
      };
    }
    case GET_BUILDINGS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loadingError: 'Failed loading buildings!'
      };
    }
    case CREATE_BUILDING: {
      return {
        ...state,
        isLoading: true,
        createError: ''
      };
    }
    case CREATE_BUILDING_SUCCESS: {
      return {
        ...state,
        buildings: [action.payload, ...state.buildings],
        isLoading: false,
        createError: ''
      };
    }
    case CREATE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: false,
        editorError: action.payload.error,
        createError: 'Failed adding new building!'
      };
    }
    case UPDATE_BUILDING: {
      return {
        ...state,
        isLoading: true,
        updateError: ''
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
        isLoading: true,
        updateError: ''
      };
    }
    case UPDATE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: true,
        editorError: action.payload.error,
        updateError: 'Failed updating building!'
      };
    }
    case DELETE_BUILDING: {
      return {
        ...state,
        isLoading: true,
        deleteError: ''
      };
    }
    case DELETE_BUILDING_SUCCESS: {
      return {
        ...state,
        buildings: state.buildings.filter(
          building => building.id !== action.payload
        ),
        isLoading: false,
        deleteError: ''
      };
    }
    case DELETE_BUILDING_FAILURE: {
      return {
        ...state,
        isLoading: false,
        deleteError: 'Fasiled deleting a building!'
      };
    }
    case CLEAN_UP_BUILDING_ERRORS: {
      return {
        ...state,
        createError: '',
        updateError: '',
        deleteError: '',
        loadingError: ''
      };
    }
    default: {
      return state;
    }
  }
};

export default BuildingReducer;
