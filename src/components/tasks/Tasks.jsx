import React, {useState, useEffect, useParams} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {parse} from 'query-string';
import {makeStyles} from '@material-ui/styles';
import {useLocation} from 'react-router-dom';
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
  Drawer
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
  cleanUpEditorErrors
} from '../../redux/actionCreators/TaskActionCreators';
import {getTaskCategories} from '../../redux/actionCreators/TaskCategoryActionCreators';
import {getBuildingApartments} from '../../redux/actionCreators/ApartmentActionCreators';

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
  }
}));

function Tasks({
  getBuildingTasks,
  getTaskCategories,
  getBuildingApartments,
  changeTaskStatus,
  cleanUpEditorErrors,
  tasks,
  taskCategories,
  apartments,
  isLoadingTasks,
  isLoadingTaskCategories,
  isLoadingApartments,
  loadingError
}) {
  const [displayTasks, setDisplayTasks] = useState(tasks);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(TaskFilters.ALL);
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();
  const location = useLocation();
  const {buildingId} = parse(location.search);

  useEffect(() => {
    getBuildingTasks({buildingId});
    getTaskCategories();
    getBuildingApartments({buildingId});
  }, []);

  useEffect(() => {
    setDisplayTasks(tasks);
    setDrawerOpen(false);
  }, [tasks]);

  const applyFilterAndSearch = (searchValue, filterValue) => {
    let newList = [];

    if (searchValue !== '') {
      newList = tasks.filter(task => {
        const lowerCaseTask = task.name.toLowerCase();
        const lowerCaseSearch = searchValue.toLowerCase();

        return (
          lowerCaseTask.includes(lowerCaseSearch) &&
          (filterValue === TaskFilters.ALL ||
            (filterValue === TaskFilters.COMPLETE && task.done) ||
            (filterValue === TaskFilters.UNCOMPLETE && !task.done))
        );
      });
    } else {
      newList = tasks.filter(task => {
        return (
          filterValue === TaskFilters.ALL ||
          (filterValue === TaskFilters.COMPLETE && task.done) ||
          (filterValue === TaskFilters.UNCOMPLETE && !task.done)
        );
      });
    }

    setDisplayTasks(newList);
  };

  const handleSearchChanges = event => {
    setSearch(event.target.value);
    applyFilterAndSearch(event.target.value, filter);
  };

  const handleFilterSelection = (event, newFilter) => {
    setFilter(newFilter);
    applyFilterAndSearch(search, newFilter);
  };

  const handleCheckbox = (event, taskId) => {
    changeTaskStatus({id: taskId, completed: event.target.checked});
  };

  // const toggleDrawer = () => {
  //   setDrawerOpen(!drawerOpen);
  // };

  const closeDrawer = () => {
    setDrawerOpen(false);
    cleanUpEditorErrors();
  };

  const handleListSelection = (event, task) => {
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
      done: false,
      dueDate: null
    };
    setSelectedTask(newTask);
    setDrawerOpen(true);
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Search tasks"
        type="search"
        variant="outlined"
        value={search}
        onChange={e => handleSearchChanges(e)}
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
          Add new
        </Button>

        <ToggleButtonGroup
          exclusive
          onChange={handleFilterSelection}
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
        <div>Loading</div>
      ) : (
        <List>
          {displayTasks.map(task => (
            <ListItem
              button
              divider
              key={task.id}
              onClick={event => handleListSelection(event, task)}
            >
              <ListItemIcon>
                <TaskIconSelector categoryId={task.taskCategoryId} />
              </ListItemIcon>
              <ListItemText primary={task.name} secondary={task.description} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={task.done}
                  onChange={event => handleCheckbox(event, task.id)}
                  value="completed"
                  color="primary"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <TaskEditor
          task={selectedTask}
          apartments={apartments}
          taskCategories={taskCategories}
          onCancel={closeDrawer}
        />
      </Drawer>
    </div>
  );
}

Tasks.propTypes = {
  getBuildingTasks: PropTypes.func.isRequired,
  getTaskCategories: PropTypes.func.isRequired,
  getBuildingApartments: PropTypes.func.isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
  cleanUpEditorErrors: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  taskCategories: PropTypes.instanceOf(Array).isRequired,
  apartments: PropTypes.instanceOf(Array).isRequired,
  loadingError: PropTypes.string,
  isLoadingTasks: PropTypes.bool.isRequired,
  isLoadingTaskCategories: PropTypes.bool.isRequired,
  isLoadingApartments: PropTypes.bool.isRequired
};
Tasks.defaultProps = {
  loadingError: ''
};

const mapStateToProps = state => ({
  tasks: state.taskReducer.tasks,
  taskCategories: state.taskCategoryReducer.taskCategories,
  apartments: state.apartmentReducer.apartments,
  loadingError: state.taskReducer.loadingError,
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
      cleanUpEditorErrors
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
