import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {IconButton, makeStyles} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import routes from '../../../router/routes';
import {ReactComponent as Logo} from '../../../assets/svg/logo.svg';
import {logout} from '../../../redux/actionCreators/UserActionCreators';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#212121'
  },
  logo: {
    margin: 'auto',
    backgroundColor: 'black',
    '& :hover': {
      cursor: 'pointer'
    }
    // [theme.breakpoints.up('md')]: {
    //   width: '500px'
    // }
  },
  profile: {
    color: 'green',
    padding: '0px 20px',
    '&:hover': {
      color: 'red'
    }
  }
}));

function Header({isAuthenticated, logout}) {
  const classes = useStyles();

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const backHandler = () => {
    if (history.location.pathname !== routes.buildings)
      history.push(routes.buildings);
  };

  const goToHomeHandler = () => {
    history.push(routes.buildings);
  };

  const openProfileMenuHandler = event => {
    console.log(history.location.pathname);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const closeHandler = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const myProfileHandler = () => {
    setAnchorEl(null);
    setOpen(false);
    // Open profile page
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    setOpen(false);
    logout();
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {history.location.pathname !== routes.buildings &&
        history.location.pathname !== routes.login &&
        history.location.pathname !== routes.home ? (
          <IconButton edge="start" onClick={backHandler} color="primary">
            <ArrowBack />
          </IconButton>
        ) : null}

        <Logo className={classes.logo} onClick={() => goToHomeHandler()} />

        {isAuthenticated && (
          <div>
            <IconButton onClick={openProfileMenuHandler} color="inherit">
              <AccountCircle color="primary" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={open}
              onClose={closeHandler}
            >
              <MenuItem onClick={myProfileHandler}>My profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.userReducer.isAuthenticated
});
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
