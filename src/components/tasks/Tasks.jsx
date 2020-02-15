import React, {useState} from 'react';
import {connect} from 'react-redux';
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
import {createTask} from '../../redux/actionCreators';

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

function Tasks(props) {
  const {addTask} = props;

  const [tasks, setTasks] = useState(props.tasks);
  const [taskCategories, setTaskCategories] = useState(props.taskCategories);
  const [apartments, setApartments] = useState(props.apartments);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(TaskFilters.ALL);
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();

  const applyFilterAndSearch = (searchValue, filterValue) => {
    let newList = [];

    if (searchValue !== '') {
      newList = props.tasks.filter(task => {
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
      newList = props.tasks.filter(task => {
        return (
          filterValue === TaskFilters.ALL ||
          (filterValue === TaskFilters.COMPLETE && task.done) ||
          (filterValue === TaskFilters.UNCOMPLETE && !task.done)
        );
      });
    }

    setTasks(newList);
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
    let newTask = {
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
    addTask(task);
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

      <List>
        {tasks.map(task => (
          <ListItem
            button
            divider
            key={task.id}
            onClick={event => handleListSelection(event, task)}
          >
            <ListItemIcon>
              <TaskIconSelector categoryId={task.categoryId} />
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

const mapStateToProps = state => ({
  //tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(createTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
