import {
  GET_BUILDING_APARTMENTS,
  GET_BUILDING_APARTMENTS_SUCCESS,
  GET_BUILDING_APARTMENTS_FAILURE,
  CREATE_APARTMENT,
  CREATE_APARTMENT_SUCCESS,
  CREATE_APARTMENT_FAILURE,
  UPDATE_APARTMENT,
  UPDATE_APARTMENT_SUCCESS,
  UPDATE_APARTMENT_FAILURE,
  DELETE_APARTMENT,
  DELETE_APARTMENT_SUCCESS,
  DELETE_APARTMENT_FAILURE,
  CLEAN_UP_APARTMENT_ERRORS
} from '../actionTypes';

const initState = {
  isLoading: false,
  apartments: [],
  createError: '',
  updateError: '',
  deleteError: '',
  loadingError: ''
};

const ApartmentReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDING_APARTMENTS: {
      return {
        ...state,
        isLoading: true,
        loadingError: ''
      };
    }
    case GET_BUILDING_APARTMENTS_SUCCESS: {
      return {
        ...state,
        apartments: action.payload,
        isLoading: false,
        loadingError: ''
      };
    }
    case GET_BUILDING_APARTMENTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loadingError: 'Failed loading apartments'
      };
    }
    case CREATE_APARTMENT: {
      return {
        ...state,
        createError: ''
      };
    }
    case CREATE_APARTMENT_SUCCESS: {
      return {
        ...state,
        apartments: [action.payload, ...state.apartments],
        createError: ''
      };
    }
    case CREATE_APARTMENT_FAILURE: {
      return {
        ...state,
        createError: 'Failed to save new apartment'
      };
    }
    case UPDATE_APARTMENT: {
      return {
        ...state,
        updateError: ''
      };
    }
    case UPDATE_APARTMENT_SUCCESS: {
      return {
        ...state,
        apartments: state.apartments.map(apartment => {
          if (apartment.id === action.payload.id) {
            return {...action.payload};
          }
          return apartment;
        }),
        updateError: ''
      };
    }
    case UPDATE_APARTMENT_FAILURE: {
      return {
        ...state,
        updateError: 'Failed to update apartment'
      };
    }
    case DELETE_APARTMENT: {
      return {
        ...state
      };
    }
    case DELETE_APARTMENT_SUCCESS: {
      return {
        ...state,
        apartments: state.apartments.filter(
          apartment => apartment.id !== action.payload
        ),
        deleteError: ''
      };
    }
    case DELETE_APARTMENT_FAILURE: {
      return {
        ...state,
        deleteError: 'Failed to delete apartment'
      };
    }
    case CLEAN_UP_APARTMENT_ERRORS: {
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

export default ApartmentReducer;
