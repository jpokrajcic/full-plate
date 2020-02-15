import React, {useState}  from 'react';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { authorize } from '../../redux/actionCreators/UserActionCreators';

const useStyles = makeStyles (theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword]  = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.authorize({username, password});
  }

  const handleInputChange = (event) => {
    if(event.target.name === 'username') {
      setUsername(event.target.value);
    }
    else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }

  return (
    <Container component="main" maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1'>
          Log in
        </Typography>
        <form className={classes.form}>
          <TextField
            id='username'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            name='username'
            autoFocus 
            autoComplete='off'
            onChange={handleInputChange}
          />
          <TextField
            id='password'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            name='password'
            type='password'
            onChange={handleInputChange}
          />  
          <Button 
            className={classes.submit}
            type='submit'
            fullWidth
            color='primary'
            variant='contained'
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </form>
      </div>
    </Container>
  )
}

Login.propTypes = {
  authorize: PropTypes.func.isRequired,
  token: PropTypes.string,
  error: PropTypes.string
}
Login.defaultProps = {
  token: '',
  error: ''
};

const mapStateToProps = state => ({
  token: state.userReducer.sessionToken,
  error: state.userReducer.error
});
const mapDispatchToProps = dispatch => bindActionCreators({authorize}, dispatch);

// const mapDispatchToProps = dispatch => ({
//   authorise: (username, password) => dispatch({type:'AUTH_REQUEST', payload: {username, password}}),
// });

export default connect(mapStateToProps, mapDispatchToProps)(Login);