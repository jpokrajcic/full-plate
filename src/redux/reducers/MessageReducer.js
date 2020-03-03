import {
  GET_BUILDING_MESSAGES,
  GET_BUILDING_MESSAGES_SUCCESS,
  GET_BUILDING_MESSAGES_FAILURE,
  CREATE_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  UPDATE_MESSAGE,
  UPDATE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_FAILURE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
  MARK_MESSAGE_AS_READ,
  MARK_MESSAGE_AS_READ_SUCCESS,
  MARK_MESSAGE_AS_READ_FAILURE,
  CLEAN_UP_ERRORS
} from '../actionTypes';

const initState = {
  isLoading: false,
  messages: [],
  createError: '',
  deleteError: '',
  updateError: '',
  markAsReadError: ''
};

const MessageReducer = (state = initState, action) => {
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
        messages: action.payload,
        isLoading: false
      };
    }
    case GET_BUILDING_MESSAGES_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CREATE_MESSAGE: {
      return {
        ...state,
        createError: ''
      };
    }
    case CREATE_MESSAGE_SUCCESS: {
      return {
        ...state,
        messages: [action.payload, ...state.messages],
        createError: ''
      };
    }
    case CREATE_MESSAGE_FAILURE: {
      return {
        ...state,
        createError: 'Failed to send new message'
      };
    }
    case UPDATE_MESSAGE: {
      return {
        ...state,
        updateError: ''
      };
    }
    case UPDATE_MESSAGE_SUCCESS: {
      return {
        ...state,
        messages: state.messages.map(message => {
          if (message.id === action.payload.id) {
            return {...action.payload};
          }
          return message;
        }),
        updateError: ''
      };
    }
    case UPDATE_MESSAGE_FAILURE: {
      return {
        ...state,
        updateError: 'Failed to update message'
      };
    }
    case DELETE_MESSAGE: {
      return {
        ...state,
        deleteError: ''
      };
    }
    case DELETE_MESSAGE_SUCCESS: {
      return {
        ...state,
        messages: state.messages.filter(
          message => message.id !== action.payload
        ),
        deleteError: ''
      };
    }
    case DELETE_MESSAGE_FAILURE: {
      return {
        ...state,
        deleteError: 'Failed to delete apartment'
      };
    }
    case MARK_MESSAGE_AS_READ: {
      return {
        ...state,
        markAsReadError: ''
      };
    }
    case MARK_MESSAGE_AS_READ_SUCCESS: {
      return {
        ...state,
        messages: state.messages.map(message => {
          if (message.id === action.payload) {
            return {...message, read: true};
          }
          return message;
        }),
        markAsReadError: ''
      };
    }
    case MARK_MESSAGE_AS_READ_FAILURE: {
      return {
        ...state,
        markAsReadError: 'Failed to mark message as read'
      };
    }
    case CLEAN_UP_ERRORS: {
      return {
        ...state,
        createError: '',
        deleteError: '',
        updateError: '',
        markAsReadError: ''
      };
    }
    default: {
      return state;
    }
  }
};

export default MessageReducer;
