import {
  GET_BUILDING_MESSAGES,
  GET_BUILDING_MESSAGES_SUCCESS,
  GET_BUILDING_MESSAGES_FAILED,
  CREATE_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILED,
  UPDATE_MESSAGE,
  UPDATE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_FAILED,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILED
} from '../actionTypes';

const initState = {
  isLoading: true,
  messages: [],
  selectedMessage: null
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDING_MESSAGES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDING_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.data,
        isLoading: false
      };
    }
    case GET_BUILDING_MESSAGES_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CREATE_MESSAGE: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CREATE_MESSAGE_SUCCESS: {
      return {
        ...state,
        messages: [...state.messages, action.data],
        isLoading: false
      };
    }
    case CREATE_MESSAGE_FAILED: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_MESSAGE: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UPDATE_MESSAGE_SUCCESS: {
      return {
        ...state,
        messages: state.messages.map(message => {
          if (message.id === action.data.id) {
            return {...action.data};
          }
          return message;
        }),
        isLoading: true
      };
    }
    case UPDATE_MESSAGE_FAILED: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_MESSAGE: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_MESSAGE_SUCCESS: {
      return {
        ...state,
        messages: state.messages.filter(message => message.id !== action.data),
        isLoading: false
      };
    }
    case DELETE_MESSAGE_FAILED: {
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

export default messageReducer;
