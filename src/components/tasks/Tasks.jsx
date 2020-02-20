import React, {useState, useEffect, useParams} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
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
import {getBuildingTasks} from '../../redux/actionCreators/TaskActionCreators';
import {getTaskCategories} from '../../redux/actionCreators/TaskCategoryActionCreators';
import {getBuildingApartments} from '../../redux/actionCreators/ApartmentActionCreators';
import {useLocation} from 'react-router-dom';

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
  tasks,
  taskCategories,
  apartments,
  tasksLoaded,
  taskCategoriesLoaded,
  apartmentsLoaded,
  loadingError
}) {
  const [displayTasks, setDisplayTasks] = useState(tasks);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(TaskFilters.ALL);
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();
  const {buildingId} = useLocation().state;

  useEffect(() => {
    getBuildingTasks({buildingId});
    getTaskCategories();
    getBuildingApartments({buildingId});
  }, []);

  useEffect(() => {
    setDisplayTasks(tasks);
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
    // update task
    console.log(`${event.target.checked} ${taskId}`);
  };

  const toggleDrawer = () => {
    if (!drawerOpen) {
      //console.log(task);
    } else {
      //console.log('banana');
    }
    setDrawerOpen(!drawerOpen);
  };

  const handleListSelection = (event, task) => {
    setSelectedTask(task);
    toggleDrawer();
  };

  const addNewHandler = () => {
    const newTask = {
      id: -1,
      name: '',
      description: '',
      categoryId: NaN,
      done: false,
      dueDate: null
    };
    setSelectedTask(newTask);
    toggleDrawer();
  };

  const saveHandler = task => {
    //addTask(task);
  };

  if (tasksLoaded || taskCategoriesLoaded || apartmentsLoaded) {
    return <div>Loading...</div>;
  }

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
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <TaskEditor
          task={selectedTask}
          apartments={apartments}
          taskCategories={taskCategories}
          onCancel={toggleDrawer}
          onSave={task => saveHandler(task)}
        />
      </Drawer>
    </div>
  );
}

Tasks.propTypes = {
  getBuildingTasks: PropTypes.func.isRequired,
  getTaskCategories: PropTypes.func.isRequired,
  getBuildingApartments: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  taskCategories: PropTypes.instanceOf(Array).isRequired,
  apartments: PropTypes.instanceOf(Array).isRequired,
  loadingError: PropTypes.string,
  tasksLoaded: PropTypes.bool.isRequired,
  taskCategoriesLoaded: PropTypes.bool.isRequired,
  apartmentsLoaded: PropTypes.bool.isRequired
};
Tasks.defaultProps = {
  loadingError: ''
};

const mapStateToProps = state => ({
  tasks: state.taskReducer.tasks,
  taskCategories: state.taskCategoryReducer.taskCategories,
  apartments: state.apartmentReducer.apartments,
  loadingError: state.taskReducer.loadingError,
  tasksLoaded: state.taskReducer.isLoading,
  taskCategoriesLoaded: state.taskCategoryReducer.isLoading,
  apartmentsLoaded: state.apartmentReducer.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {getBuildingTasks, getTaskCategories, getBuildingApartments},
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
