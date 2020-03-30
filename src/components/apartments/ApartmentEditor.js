/* eslint-disable no-shadow */
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  OutlinedInput,
  InputAdornment,
  FormHelperText
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
  createApartment,
  updateApartment,
  deleteApartment
} from '../../redux/actionCreators/ApartmentActionCreators';

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
  hidden: {
    display: 'none'
  },
  inputAdornment: {
    color: 'rgb(117, 117, 117)'
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: 'rgb(255,  255, 255)'
  }
}));

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function ApartmentEditor({
  createApartment,
  updateApartment,
  deleteApartment,
  apartment,
  onCancel
}) {
  const classes = useStyles();
  const adultsCountInputLabel = useRef(null);
  const childrenCountInputLabel = useRef(null);
  const [adultsCountInputLabelWidth, setAdultsCountInputLabelWidth] = useState(
    0
  );
  const [
    childrenCountInputLabelWidth,
    setChildrenCountInputLabelWidth
  ] = useState(0);

  // Handle Select componets InputLabel width
  // (without this we get outline overlaping InputLabel)
  useEffect(() => {
    if (
      adultsCountInputLabel !== null &&
      adultsCountInputLabel.current !== null
    )
      setAdultsCountInputLabelWidth(adultsCountInputLabel.current.offsetWidth);
    if (
      childrenCountInputLabel !== null &&
      childrenCountInputLabel.current !== null
    )
      setChildrenCountInputLabelWidth(
        childrenCountInputLabel.current.offsetWidth
      );
  }, []);

  function saveApartment(values) {
    const apartmentData = {
      id: apartment.id,
      buildingId: apartment.buildingId,
      number: values.number,
      lastName: values.lastName,
      contact: values.contact,
      size: values.size,
      adultsCount: values.adultsCount,
      childrenCount: values.childrenCount,
      email: values.email,
      phone: values.phone,
      mobile: values.mobile,
      isOccupied: values.isOccupied,
      rentEnds: values.rentEnds
    };

    if (apartmentData.id > -1) {
      updateApartment({apartment: apartmentData});
    } else {
      createApartment({apartment: apartmentData});
    }
  }

  function cancelHandler() {
    onCancel();
  }

  function deleteHandler() {
    deleteApartment({id: apartment.id});
  }

  const formik = useFormik({
    initialValues: {
      number: apartment.number,
      lastName: apartment.lastName,
      contact: apartment.contact,
      size: apartment.size,
      adultsCount: apartment.adultsCount,
      childrenCount: apartment.childrenCount,
      email: apartment.email,
      phone: apartment.phone,
      mobile: apartment.mobile,
      rentEnds: apartment.rentEnds,
      isOccupied: apartment.isOccupied
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .max(3, 'Must be 3 characters or less')
        .required('Required'),
      lastName: Yup.string().required('Required'),
      contact: Yup.string().required('Required'),
      size: Yup.number()
        .typeError('Must be number')
        .min(1, 'Minimum value is 1')
        .max(999, 'Maximum value is 999')
        .required('Required'),
      adultsCount: Yup.number()
        .typeError('Must be number')
        .min(0, 'Minimum value is 0')
        .max(999, 'Maximum value is 999')
        .required('Required'),
      childrenCount: Yup.number()
        .typeError('Must be number')
        .min(0, 'Minimum value is 0')
        .max(999, 'Maximum value is 999')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      mobile: Yup.string().matches(phoneRegExp, 'Mobile number is not valid'),
      rentEnds: Yup.string(),
      isOccupied: Yup.boolean().required('Required')
    }),
    onSubmit: values => {
      saveApartment(values);
    }
  });

  // Display blank editor if apartment is missing
  if (apartment === null || apartment === 'undefined') return null;

  return (
    <div className={classes.root}>
      <span className={classes.title}>
        {apartment.id === -1 ? 'New apartment' : 'Edit apartment'}
      </span>

      <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
        <TextField
          id="number"
          label="Apartment number"
          value={formik.values.number}
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          className={classes.formItem}
          error={formik.errors.number && formik.touched.number}
          helperText={
            formik.errors.number &&
            formik.touched.number &&
            formik.errors.number
          }
        />

        <TextField
          id="lastName"
          label="Last name"
          value={formik.values.lastName}
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          className={classes.formItem}
          error={formik.errors.lastName && formik.touched.lastName}
          helperText={
            formik.errors.lastName &&
            formik.touched.lastName &&
            formik.errors.lastName
          }
        />

        <TextField
          id="contact"
          label="Contact"
          value={formik.values.contact}
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          className={classes.formItem}
          error={formik.errors.contact && formik.touched.contact}
          helperText={
            formik.errors.contact &&
            formik.touched.contact &&
            formik.errors.contact
          }
        />

        <FormControl
          fullWidth
          className={classes.formItem}
          variant="outlined"
          error={formik.errors.size && formik.touched.size}
          //   helperText={
          //     formik.errors.size && formik.touched.size && formik.errors.size
          //   }
        >
          <InputLabel htmlFor="size">Size</InputLabel>
          <OutlinedInput
            id="size"
            value={formik.values.size}
            onChange={formik.handleChange}
            startAdornment={
              <InputAdornment
                className={classes.inputAdornment}
                position="start"
              >
                m<sup>2</sup>
              </InputAdornment>
            }
            labelWidth={60}
          />
          <FormHelperText id="outlined-weight-helper-text">
            {formik.errors.size && formik.touched.size && formik.errors.size}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" className={classes.formItem}>
          <InputLabel ref={adultsCountInputLabel} id="adultsCountOutlinedLabel">
            Number of adults
          </InputLabel>
          <Select
            labelId="adultsCountOutlinedLabel"
            name="adultsCount"
            value={formik.values.adultsCount}
            onChange={formik.handleChange}
            labelWidth={adultsCountInputLabelWidth}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formItem}>
          <InputLabel
            ref={childrenCountInputLabel}
            id="childrenCountOutlinedLabel"
          >
            Number of children
          </InputLabel>
          <Select
            labelId="childrenCountOutlinedLabel"
            name="childrenCount"
            value={formik.values.childrenCount}
            onChange={formik.handleChange}
            labelWidth={childrenCountInputLabelWidth}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="email"
          label="E-mail"
          value={formik.values.email}
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          className={classes.formItem}
          error={formik.errors.email && formik.touched.email}
          helperText={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
        />

        <TextField
          id="phone"
          label="Phone"
          value={formik.values.phone}
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          className={classes.formItem}
          error={formik.errors.phone && formik.touched.phone}
          helperText={
            formik.errors.phone && formik.touched.phone && formik.errors.phone
          }
        />

        <TextField
          id="mobile"
          label="Mobile"
          value={formik.values.mobile}
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          className={classes.formItem}
          error={formik.errors.mobile && formik.touched.mobile}
          helperText={
            formik.errors.mobile &&
            formik.touched.mobile &&
            formik.errors.mobile
          }
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            disablePast
            inputVariant="outlined"
            format="dd/MM/yyyy"
            id="rentEnds"
            label="Rent ends"
            value={formik.values.rentEnds}
            onChange={value => formik.setFieldValue('rentEnds', value)}
            InputAdornmentProps={{position: 'start'}}
            className={classes.hidden}
          />
        </MuiPickersUtilsProvider>

        <FormControlLabel
          control={
            <Checkbox
              id="isOccupied"
              checked={formik.values.isOccupied}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label="Occupied"
        />

        <div className={classNames(classes.buttonsContainer, classes.formItem)}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            type="submit"
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

          {apartment.id === -1 ? null : (
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

ApartmentEditor.propTypes = {
  createApartment: PropTypes.func.isRequired,
  updateApartment: PropTypes.func.isRequired,
  deleteApartment: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  apartment: PropTypes.shape({
    id: PropTypes.number,
    buildingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    number: PropTypes.string,
    lastName: PropTypes.string,
    contact: PropTypes.string,
    size: PropTypes.number,
    adultsCount: PropTypes.number,
    childrenCount: PropTypes.number,
    email: PropTypes.string,
    phone: PropTypes.string,
    mobile: PropTypes.string,
    isOccupied: PropTypes.bool,
    rentEnds: PropTypes.string
  }).isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {createApartment, updateApartment, deleteApartment},
    dispatch
  );

export default connect(null, mapDispatchToProps)(ApartmentEditor);
