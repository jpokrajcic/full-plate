/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {authorize} from '../../redux/actionCreators/UserActionCreators';
import routes from '../../router/routes';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login({authorize, isAuthenticated, loginError}) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace({
        pathname: routes.buildings
      });
    }
  }, [isAuthenticated]);

  function submitHandler(event) {
    event.preventDefault();
    authorize({username, password});
  }

  function inputChangeHandler(event) {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1">Log in</Typography>
        <form className={classes.form}>
          <TextField
            id="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            autoComplete="off"
            onChange={inputChangeHandler}
          />
          <TextField
            id="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            onChange={inputChangeHandler}
          />
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            onClick={submitHandler}
          >
            Log in
          </Button>
        </form>
        {loginError !== '' ? <span>{loginError}</span> : null}
      </div>
    </Container>
  );
}

Login.propTypes = {
  authorize: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginError: PropTypes.string
};
Login.defaultProps = {
  loginError: ''
};

const mapStateToProps = state => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  loginError: state.userReducer.loginError
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({authorize}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
