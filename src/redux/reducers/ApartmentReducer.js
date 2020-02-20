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
  DELETE_APARTMENT_FAILURE
} from '../actionTypes';

const initState = {
  isLoading: true,
  loaded: false,
  apartments: [],
  selectedApartment: null
};

const ApartmentReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDING_APARTMENTS: {
      return {
        ...state,
        isLoading: true,
        loaded: false
      };
    }
    case GET_BUILDING_APARTMENTS_SUCCESS: {
      return {
        ...state,
        apartments: action.payload,
        isLoading: false,
        loaded: true
      };
    }
    case GET_BUILDING_APARTMENTS_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CREATE_APARTMENT: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CREATE_APARTMENT_SUCCESS: {
      return {
        ...state,
        apartments: [...state.apartments, action.payload],
        isLoading: false
      };
    }
    case CREATE_APARTMENT_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_APARTMENT: {
      return {
        ...state,
        isLoading: true
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
        isLoading: true
      };
    }
    case UPDATE_APARTMENT_FAILURE: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_APARTMENT: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_APARTMENT_SUCCESS: {
      return {
        ...state,
        apartments: state.apartments.filter(
          apartment => apartment.id !== action.payload
        ),
        isLoading: false
      };
    }
    case DELETE_APARTMENT_FAILURE: {
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

export default ApartmentReducer;
