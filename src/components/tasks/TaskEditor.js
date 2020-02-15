import React, {useState, useRef} from 'react';
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
    justifyContent: 'space-evenly'
  }
}));
const TaskEditor = props => {
  console.log(props.task);

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

  const [name, setName] = useState(props.task.name);
  const [categoryId, setCategoryId] = useState(props.task.categoryId);
  const [apartmentId, setApartmentId] = useState(props.task.apartmentId);
  const [description, setDescription] = useState(props.task.description);
  const [dueDate, setDueDate] = useState(props.task.dueDate);

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
    //props.onSave({id: 3, name: 'test', description: 'nesto'});
  };

  const cancelHandler = () => {
    console.log('cancelHandler');
    props.onCancel();
  };

  if (props.task) {
    return (
      <div className={classes.root}>
        <span>{props.task.id === -1 ? 'New task' : 'Edit task'}</span>

        <form className={classes.formContainer}>
          <TextField
            label="Task name"
            value={name}
            type="text"
            variant="outlined"
            onChange={nameChangeHandler}
          />

          <FormControl variant="outlined">
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
              {props.taskCategories.map(category => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel ref={apartmentInputLabel} id="apartmentOutlinedLabel">
              Apartment
            </InputLabel>
            <Select
              labelId="apartmentOutlinedLabel"
              value={apartmentId}
              onChange={apartmentChangeHandler}
              labelWidth={apartmentLabelWidth}
            >
              {props.apartments.map(apartment => (
                <MenuItem key={apartment.id} value={apartment.id}>
                  {`${apartment.number} ${apartment.firstName} ${apartment.lastName}`}
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
            />
          </MuiPickersUtilsProvider>

          <div className={classes.buttonsContainer}>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              onClick={saveNewHandler}
            >
              Save
            </Button>

            <Button
              disableElevation
              variant="contained"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default TaskEditor;
