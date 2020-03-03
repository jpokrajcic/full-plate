import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  TextField,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import DateFnsUtils from '@date-io/date-fns';
import classNames from 'classnames';
import {
  createTask,
  updateTask,
  deleteTask
} from '../../redux/actionCreators/TaskActionCreators';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '16px'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  button: {
    width: '50%',
    margin: '0px 16px'
  },
  formItem: {
    marginTop: '16px',
    marginBottom: '16px'
  },
  errorMessage: {
    fontSize: '16px',
    color: 'rgb(255,0,0)',
    width: '100%',
    textAlign: 'center'
  },
  deleteButton: {
    // backgroundColor: theme.palette.error.main,
    color: 'rgb(0,  0, 0)'
  }
}));

function TaskEditor({
  createTask,
  updateTask,
  deleteTask,
  task,
  apartments,
  taskCategories,
  onCancel
}) {
  const classes = useStyles();
  const categoryInputLabel = useRef(null);
  const apartmentInputLabel = useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = useState(0);
  const [apartmentLabelWidth, setApartmentLabelWidth] = useState(0);
  const [name, setName] = useState(task ? task.name : '');
  const [taskCategoryId, setTaskCategoryId] = useState(
    task ? task.taskCategoryId : ''
  );
  const [apartmentId, setApartmentId] = useState(task ? task.apartmentId : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : null);
  const [completed, setCompleted] = useState(task ? task.completed : false);

  // Handle Select componets InputLabel width
  // (without this we get outline overlaping InputLabel)
  useEffect(() => {
    if (categoryInputLabel !== null && categoryInputLabel.current !== null)
      setCategoryLabelWidth(categoryInputLabel.current.offsetWidth);
    if (apartmentInputLabel !== null && apartmentInputLabel.current !== null)
      setApartmentLabelWidth(apartmentInputLabel.current.offsetWidth);
  }, []);

  const nameChangeHandler = event => {
    setName(event.target.value);
  };

  const categoryChangeHandler = event => {
    setTaskCategoryId(event.target.value);
  };

  const apartmentChangeHandler = event => {
    setApartmentId(event.target.value);
  };

  const descriptionChangeHandler = event => {
    setDescription(event.target.value);
  };

  const dateChangeHandler = date => {
    setDueDate(date);
  };

  const completionChangeHandler = event => {
    setCompleted(event.target.checked);
  };

  const saveHandler = () => {
    const taskData = {
      id: task.id,
      buildingId: task.buildingId,
      apartmentId,
      taskCategoryId,
      name,
      description,
      completed,
      dueDate
    };

    if (taskData.id > -1) {
      updateTask({task: taskData});
    } else {
      createTask({task: taskData});
    }
  };

  const cancelHandler = () => {
    onCancel();
  };

  const deleteHandler = () => {
    deleteTask({id: task.id});
  };

  // Display blank editor if task is missing
  if (task === null || task === 'undefined') return null;

  return (
    <div className={classes.root}>
      <span className={classes.title}>
        {task.id === -1 ? 'New task' : 'Edit task'}
      </span>

      <form className={classes.formContainer}>
        <TextField
          label="Task name"
          value={name}
          type="text"
          variant="outlined"
          onChange={nameChangeHandler}
          className={classes.formItem}
        />

        <FormControl variant="outlined" className={classes.formItem}>
          <InputLabel ref={categoryInputLabel} id="categoryOutlinedLabel">
            Category
          </InputLabel>
          <Select
            labelId="categoryOutlinedLabel"
            id="categoryOutlinedSelect"
            value={taskCategoryId}
            onChange={categoryChangeHandler}
            labelWidth={categoryLabelWidth}
          >
            {taskCategories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formItem}>
          <InputLabel ref={apartmentInputLabel} id="apartmentOutlinedLabel">
            Apartment
          </InputLabel>
          <Select
            labelId="apartmentOutlinedLabel"
            value={apartmentId}
            onChange={apartmentChangeHandler}
            labelWidth={apartmentLabelWidth}
          >
            {apartments.map(apartment => (
              <MenuItem key={apartment.id} value={apartment.id}>
                {`${apartment.number} ${apartment.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          value={description}
          type="text"
          variant="outlined"
          multiline
          rows={5}
          placeholder="Enter task description..."
          onChange={descriptionChangeHandler}
          className={classes.formItem}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            clearable
            inputVariant="outlined"
            format="dd/MM/yyyy"
            id="date-picker-inline"
            label="Due date"
            value={dueDate}
            onChange={dateChangeHandler}
            InputAdornmentProps={{position: 'start'}}
            className={classes.formItem}
          />
        </MuiPickersUtilsProvider>

        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={completionChangeHandler}
              value="completed"
              color="primary"
            />
          }
          label="Completed"
        />

        <div className={classNames(classes.buttonsContainer, classes.formItem)}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={saveHandler}
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            disableElevation
            variant="contained"
            onClick={cancelHandler}
            className={classes.button}
          >
            Cancel
          </Button>

          {task.id === -1 ? null : (
            <Button
              variant="contained"
              onClick={deleteHandler}
              className={classNames(classes.button, classes.deleteButton)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

TaskEditor.propTypes = {
  createTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number,
    buildingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    apartmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    taskCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    dueDate: PropTypes.string
  }).isRequired,
  apartments: PropTypes.instanceOf(Array).isRequired,
  taskCategories: PropTypes.instanceOf(Array).isRequired
};

const mapStateToProps = state => ({
  taskCategories: state.taskCategoryReducer.taskCategories,
  apartments: state.apartmentReducer.apartments
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({createTask, updateTask, deleteTask}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditor);
