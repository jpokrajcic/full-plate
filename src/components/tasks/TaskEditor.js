import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import classNames from 'classnames';
import {
  createTask,
  updateTask
} from '../../redux/actionCreators/TaskActionCreators';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
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
  }
}));

function TaskEditor({
  createTask,
  updateTask,
  task,
  apartments,
  taskCategories,
  onCancel
}) {
  const classes = useStyles();

  const categoryInputLabel = useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = useState(0);
  React.useEffect(() => {
    setCategoryLabelWidth(categoryInputLabel.current.offsetWidth);
  }, []);

  const apartmentInputLabel = useRef(null);
  const [apartmentLabelWidth, setApartmentLabelWidth] = useState(0);
  React.useEffect(() => {
    setApartmentLabelWidth(apartmentInputLabel.current.offsetWidth);
  }, []);

  const [name, setName] = useState(task.name);
  const [categoryId, setCategoryId] = useState(task.taskCategoryId);
  const [apartmentId, setApartmentId] = useState(task.apartmentId);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const nameChangeHandler = event => {
    setName(event.target.value);
  };

  const categoryChangeHandler = event => {
    setCategoryId(event.target.value);
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

  const saveNewHandler = () => {
    if (task.id > -1) {
      //updateTask();
    } else {
      //createTask();
    }
  };

  const cancelHandler = () => {
    onCancel();
  };

  if (task === null || task === 'undefined') return null;

  return (
    <div className={classes.root}>
      <span>{task.id === -1 ? 'New task' : 'Edit task'}</span>

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
            value={categoryId}
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
                {`${apartment.apartmentNumber} ${apartment.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          value={description}
          type="text"
          variant="outlined"
          multiline={true}
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

        <div className={classNames(classes.buttonsContainer, classes.formItem)}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={saveNewHandler}
            className={classes.button}
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
        </div>
      </form>
    </div>
  );
}

TaskEditor.propTypes = {
  createTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  apartments: PropTypes.instanceOf(Array).isRequired,
  taskCategories: PropTypes.instanceOf(Array).isRequired,
  editorError: PropTypes.string
};
TaskEditor.defaultProps = {
  editorError: ''
};

const mapStateToProps = state => ({
  editorError: state.taskReducer.editorError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({createTask, updateTask}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditor);
