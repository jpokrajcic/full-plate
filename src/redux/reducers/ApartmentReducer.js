import {
  GET_BUILDING_APARTMENTS,
  GET_BUILDING_APARTMENTS_SUCCESS,
  GET_BUILDING_APARTMENTS_FAILED,
  CREATE_APARTMENT,
  CREATE_APARTMENT_SUCCESS,
  CREATE_APARTMENT_FAILED,
  UPDATE_APARTMENT,
  UPDATE_APARTMENT_SUCCESS,
  UPDATE_APARTMENT_FAILED,
  DELETE_APARTMENT,
  DELETE_APARTMENT_SUCCESS,
  DELETE_APARTMENT_FAILED
} from '../actionTypes';

const initState = {
  isLoading: true,
  apartments: [],
  selectedApartment: null
};

const apartmentReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDING_APARTMENTS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDING_APARTMENTS_SUCCESS: {
      return {
        ...state,
        apartments: action.data,
        isLoading: false
      };
    }
    case GET_BUILDING_APARTMENTS_FAILED: {
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
        apartments: [...state.apartments, action.data],
        isLoading: false
      };
    }
    case CREATE_APARTMENT_FAILED: {
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
          if (apartment.id === action.data.id) {
            return {...action.data};
          }
          return apartment;
        }),
        isLoading: true
      };
    }
    case UPDATE_APARTMENT_FAILED: {
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
          apartment => apartment.id !== action.data
        ),
        isLoading: false
      };
    }
    case DELETE_APARTMENT_FAILED: {
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

export default apartmentReducer;
