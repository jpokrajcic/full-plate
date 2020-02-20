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
  DELETE_TASK_FAILURE
} from '../actionTypes';

const initState = {
  isLoading: true,
  tasks: [],
  selectedTask: null,
  loadingError: '',
  editorError: '',
  deletionError: ''
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
        isLoading: true
      };
    }
    case CREATE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: false,
        editorError: ''
      };
    }
    case CREATE_TASK_FAILURE: {
      return {
        ...state,
        isLoading: false,
        editorError: action.payload
      };
    }
    case UPDATE_TASK: {
      return {
        ...state,
        isLoading: true
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
        isLoading: true,
        editorError: ''
      };
    }
    case UPDATE_TASK_FAILURE: {
      return {
        ...state,
        isLoading: true,
        editorError: action.payload
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        isLoading: false,
        deletionError: ''
      };
    }
    case DELETE_TASK_FAILURE: {
      return {
        ...state,
        isLoading: false,
        deletionError: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default TaskReducer;
