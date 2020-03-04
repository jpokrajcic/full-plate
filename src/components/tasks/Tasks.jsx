/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {parse} from 'query-string';
import {makeStyles} from '@material-ui/styles';
import {useLocation} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  InputAdornment,
  Button,
  Drawer,
  CircularProgress
} from '@material-ui/core';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import TaskFilters from '../../enum/TaskFilters';
import TaskEditor from './TaskEditor';
import TaskIconSelector from './TaskIconSelector';
import {
  getBuildingTasks,
  changeTaskStatus,
  cleanUpTaskErrors
} from '../../redux/actionCreators/TaskActionCreators';
import {
  getTaskCategories,
  cleanUpTaskCategoryErrors
} from '../../redux/actionCreators/TaskCategoryActionCreators';
import {
  getBuildingApartments,
  cleanUpApartmentErrors
} from '../../redux/actionCreators/ApartmentActionCreators';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0px'
  },
  listItem: {
    border: '2px solid red',
    boxSizing: 'content-box',
    padding: '8px'
  },
  loaderContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '100px'
  }
}));

function Tasks({
  getBuildingTasks,
  getTaskCategories,
  getBuildingApartments,
  changeTaskStatus,
  cleanUpTaskErrors,
  cleanUpTaskCategoryErrors,
  cleanUpApartmentErrors,
  tasks,
  isLoadingTasks,
  isLoadingTaskCategories,
  isLoadingApartments,
  loadingTasksError,
  loadingTaskCategoriesError,
  loadingApartmentsError,
  createError,
  updateError,
  deleteError
}) {
  const [displayTasks, setDisplayTasks] = useState(tasks);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(TaskFilters.ALL);
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const location = useLocation();
  const {buildingId} = parse(location.search);

  function applyFilterAndSearch(searchValue, filterValue) {
    let newList = [];

    if (searchValue !== '') {
      newList = tasks.filter(task => {
        const lowerCaseTask = task.name.toLowerCase();
        const lowerCaseSearch = searchValue.toLowerCase();

        return (
          lowerCaseTask.includes(lowerCaseSearch) &&
          (filterValue === TaskFilters.ALL ||
            (filterValue === TaskFilters.COMPLETE && task.completed) ||
            (filterValue === TaskFilters.UNCOMPLETE && !task.completed))
        );
      });
    } else {
      newList = tasks.filter(task => {
        return (
          filterValue === TaskFilters.ALL ||
          (filterValue === TaskFilters.COMPLETE && task.completed) ||
          (filterValue === TaskFilters.UNCOMPLETE && !task.completed)
        );
      });
    }

    setDisplayTasks(newList);
  }

  const searchChangesHandler = event => {
    setSearch(event.target.value);
    applyFilterAndSearch(event.target.value, filter);
  };

  const filterSelectionHandler = (event, newFilter) => {
    setFilter(newFilter);
    applyFilterAndSearch(search, newFilter);
  };

  const checkboxHandler = (event, taskId) => {
    changeTaskStatus({id: taskId, completed: event.target.checked});
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const listSelectionHandler = (event, task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const addNewHandler = () => {
    const newTask = {
      id: -1,
      buildingId,
      apartmentId: '',
      taskCategoryId: '',
      name: '',
      description: '',
      completed: false,
      dueDate: null
    };
    setSelectedTask(newTask);
    setDrawerOpen(true);
  };

  function showSnackBar(message, cleanUpFunction) {
    enqueueSnackbar(message, {
      variant: 'error',
      onClose: () => cleanUpFunction()
    });
  }

  useEffect(() => {
    getBuildingTasks({buildingId});
    getTaskCategories();
    getBuildingApartments({buildingId});
  }, []);

  useEffect(() => {
    setDisplayTasks(tasks);
    setDrawerOpen(false);
    applyFilterAndSearch(search, filter);
  }, [tasks]);

  // Show snack bar notifications (if any)
  useEffect(() => {
    if (createError !== '') showSnackBar(createError, cleanUpTaskErrors);

    if (updateError !== '') showSnackBar(updateError, cleanUpTaskErrors);

    if (deleteError !== '') showSnackBar(deleteError, cleanUpTaskErrors);

    if (loadingTasksError !== '')
      showSnackBar(loadingTasksError, cleanUpTaskErrors);

    if (loadingTaskCategoriesError !== '')
      showSnackBar(loadingTaskCategoriesError, cleanUpTaskCategoryErrors);

    if (loadingApartmentsError !== '')
      showSnackBar(loadingApartmentsError, cleanUpApartmentErrors);
  }, [
    createError,
    updateError,
    deleteError,
    loadingTasksError,
    loadingTaskCategoriesError,
    loadingApartmentsError
  ]);

  return (
    <div className={classes.root}>
      <TextField
        label="Search tasks"
        type="search"
        variant="outlined"
        value={search}
        onChange={e => searchChangesHandler(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          )
        }}
      />

      <div className={classes.actionsContainer}>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={addNewHandler}
        >
          New task
        </Button>

        <ToggleButtonGroup
          exclusive
          onChange={filterSelectionHandler}
          value={filter}
        >
          <ToggleButton size="small" value={TaskFilters.ALL} aria-label="all">
            All
          </ToggleButton>
          <ToggleButton
            size="small"
            value={TaskFilters.UNCOMPLETE}
            aria-label="uncompleted"
          >
            Uncompleted
          </ToggleButton>
          <ToggleButton
            size="small"
            value={TaskFilters.COMPLETE}
            aria-label="completed"
          >
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {isLoadingTasks || isLoadingTaskCategories || isLoadingApartments ? (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <List>
          {displayTasks.map(task => (
            <ListItem
              button
              divider
              key={task.id}
              onClick={event => listSelectionHandler(event, task)}
            >
              <ListItemIcon>
                <TaskIconSelector
                  categoryId={
                    task.taskCategoryId !== null ? task.taskCategoryId : -1
                  }
                />
              </ListItemIcon>
              <ListItemText primary={task.name} secondary={task.description} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={task.completed}
                  onChange={event => checkboxHandler(event, task.id)}
                  value="completed"
                  color="primary"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <TaskEditor task={selectedTask} onCancel={closeDrawer} />
      </Drawer>
    </div>
  );
}

Tasks.propTypes = {
  getBuildingTasks: PropTypes.func.isRequired,
  getTaskCategories: PropTypes.func.isRequired,
  getBuildingApartments: PropTypes.func.isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
  cleanUpTaskErrors: PropTypes.func.isRequired,
  cleanUpTaskCategoryErrors: PropTypes.func.isRequired,
  cleanUpApartmentErrors: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  loadingTasksError: PropTypes.string,
  loadingTaskCategoriesError: PropTypes.string,
  loadingApartmentsError: PropTypes.string,
  createError: PropTypes.string,
  updateError: PropTypes.string,
  deleteError: PropTypes.string,
  isLoadingTasks: PropTypes.bool.isRequired,
  isLoadingTaskCategories: PropTypes.bool.isRequired,
  isLoadingApartments: PropTypes.bool.isRequired
};
Tasks.defaultProps = {
  loadingTasksError: '',
  loadingTaskCategoriesError: '',
  loadingApartmentsError: '',
  createError: '',
  updateError: '',
  deleteError: ''
};

const mapStateToProps = state => ({
  tasks: state.taskReducer.tasks,
  loadingTasksError: state.taskReducer.loadingError,
  loadingApartmentsError: state.apartmentReducer.loadingError,
  loadingTaskCategoriesError: state.taskCategoryReducer.loadingError,
  createError: state.taskReducer.createError,
  updateError: state.taskReducer.updateError,
  deleteError: state.taskReducer.deleteError,
  isLoadingTasks: state.taskReducer.isLoading,
  isLoadingTaskCategories: state.taskCategoryReducer.isLoading,
  isLoadingApartments: state.apartmentReducer.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBuildingTasks,
      getTaskCategories,
      getBuildingApartments,
      changeTaskStatus,
      cleanUpTaskErrors,
      cleanUpTaskCategoryErrors,
      cleanUpApartmentErrors
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
