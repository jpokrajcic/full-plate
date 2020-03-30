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
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import classNames from 'classnames';
import {createMessage} from '../../redux/actionCreators/MessageActionCreators';

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

function MessageEditor({createMessage, apartments, message, onCancel}) {
  const classes = useStyles();
  const apartmentInputLabel = useRef(null);
  const [apartmentInputLabelWidth, setApartmentInputLabelWidth] = useState(0);

  // Handle Select componets InputLabel width
  // (without this we get outline overlaping InputLabel)
  useEffect(() => {
    if (apartmentInputLabel !== null && apartmentInputLabel.current !== null)
      setApartmentInputLabelWidth(apartmentInputLabel.current.offsetWidth);
  }, []);

  function sendMessage(values) {
    const messageData = {
      id: message.id,
      buildingId: message.buildingId,
      title: values.title,
      body: values.body,
      apartmentId: values.apartmentId
    };

    createMessage({message: messageData});
  }

  function cancelHandler() {
    onCancel();
  }

  const formik = useFormik({
    initialValues: {
      title: message.title,
      body: message.body,
      apartmentId: message.apartmentId
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      body: Yup.string()
        .max(5000, 'Must be 5000 characters or less')
        .required('Required'),
      apartmentId: Yup.number().required('Required')
    }),
    onSubmit: values => {
      sendMessage(values);
    }
  });

  // Display blank editor if message is missing
  if (message === null || message === 'undefined') return null;

  return (
    <div className={classes.root}>
      <span className={classes.title}>
        {message.id === -1 ? 'New message' : 'Reply to message'}
      </span>

      <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          label="Title"
          value={formik.values.title}
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          className={classes.formItem}
          error={formik.errors.title && formik.touched.title}
          helperText={
            formik.errors.title && formik.touched.title && formik.errors.title
          }
        />

        <FormControl variant="outlined" className={classes.formItem}>
          <InputLabel ref={apartmentInputLabel} id="apartmentOutlinedLabel">
            Recipient
          </InputLabel>
          <Select
            labelId="apartmentOutlinedLabel"
            name="apartmentId"
            value={formik.values.apartmentId}
            onChange={formik.handleChange}
            labelWidth={apartmentInputLabelWidth}
            disabled={message.id !== -1}
          >
            {apartments.map(apartment => (
              <MenuItem key={apartment.id} value={apartment.id}>
                {`${apartment.number} ${apartment.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="body"
          label="Message"
          value={formik.values.body}
          type="text"
          variant="outlined"
          multiline
          rows={5}
          placeholder="Enter message..."
          onChange={formik.handleChange}
          className={classes.formItem}
        />

        <div className={classNames(classes.buttonsContainer, classes.formItem)}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            startIcon={<SendIcon />}
          >
            Send
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

MessageEditor.propTypes = {
  createMessage: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number,
    buildingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    apartmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    body: PropTypes.string
  }).isRequired,
  apartments: PropTypes.instanceOf(Array).isRequired
};

const mapStateToProps = state => ({
  apartments: state.apartmentReducer.apartments
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({createMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageEditor);
