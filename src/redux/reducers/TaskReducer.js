import {
  GET_BUILDING_TASKS,
  GET_BUILDING_TASKS_SUCCESS,
  GET_BUILDING_TASKS_FAILURE,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_STATUS_SUCCESS,
  CHANGE_TASK_STATUS_FAILURE,
  CLEAN_UP_EDITOR_ERRORS
} from '../actionTypes';

const initState = {
  isLoading: true,
  tasks: [],
  selectedTask: null,
  loadingError: '',
  createError: '',
  updateError: '',
  deleteError: ''
};

const TaskReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BUILDING_TASKS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_BUILDING_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        loadingError: ''
      };
    }
    case GET_BUILDING_TASKS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loadingError: action.payload
      };
    }
    case CREATE_TASK: {
      return {
        ...state,
        createError: ''
      };
    }
    case CREATE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        createError: ''
      };
    }
    case CREATE_TASK_FAILURE: {
      return {
        ...state,
        createError: 'Failed to save new task'
      };
    }
    case UPDATE_TASK: {
      return {
        ...state,
        updateError: ''
      };
    }
    case UPDATE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            return {...action.payload};
          }
          return task;
        }),
        updateError: ''
      };
    }
    case UPDATE_TASK_FAILURE: {
      return {
        ...state,
        updateError: 'Failed to update task'
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        deleteError: ''
      };
    }
    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        deleteError: ''
      };
    }
    case DELETE_TASK_FAILURE: {
      return {
        ...state,
        deleteError: 'Failed to delete task'
      };
    }
    case CHANGE_TASK_STATUS: {
      return {
        ...state,
        updateError: ''
      };
    }
    case CHANGE_TASK_STATUS_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            return {...action.payload};
          }
          return task;
        }),
        updateError: ''
      };
    }
    case CHANGE_TASK_STATUS_FAILURE: {
      return {
        ...state,
        updateError: 'Failed to update task'
      };
    }
    case CLEAN_UP_EDITOR_ERRORS: {
      return {
        ...state,
        createError: '',
        updateError: '',
        deleteError: ''
      };
    }
    default: {
      return state;
    }
  }
};

export default TaskReducer;
