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
import {useLocation, Redirect, useHistory} from 'react-router-dom';
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
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login({authorize, isAuthenticated, error}) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectedFrom, setRedirectedFrom] = useState(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    //localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('LOGIN isAuthenticated');
      const {from} = location.state || {pathname: routes.buildings};
      history.replace({
        pathname: routes.buildings
      });
    }
  }, [isAuthenticated]);

  const handleSubmit = event => {
    event.preventDefault();
    authorize({username, password});
  };

  const handleInputChange = event => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  // if (isAuthenticated && hasRedirected === false) {
  //   setHasRedirected(true);
  //   console.log('LOGIN isAuthenticated');
  //   const {from} = location.state || {pathname: routes.buildings};
  //   history.replace(from);
  // }

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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </form>
      </div>
    </Container>
  );
}

Login.propTypes = {
  authorize: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string
};
Login.defaultProps = {
  error: ''
};

const mapStateToProps = state => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  error: state.userReducer.error
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({authorize}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
