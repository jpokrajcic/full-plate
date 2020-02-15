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
  selectedTask: null
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
        tasks: action.data,
        isLoading: false
      };
    }
    case GET_BUILDING_TASKS_FAILURE: {
      return {
        ...state,
        isLoading: false
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
        tasks: [...state.tasks, action.data],
        isLoading: false
      };
    }
    case CREATE_TASK_FAILURE: {
      return {
        ...state,
        isLoading: false
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
          if (task.id === action.data.id) {
            return {...action.data};
          }
          return task;
        }),
        isLoading: true
      };
    }
    case UPDATE_TASK_FAILURE: {
      return {
        ...state,
        isLoading: true
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
        tasks: state.tasks.filter(task => task.id !== action.data),
        isLoading: false
      };
    }
    case DELETE_TASK_FAILURE: {
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

export default TaskReducer;
