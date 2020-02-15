import React from 'react';
import {useHistory} from 'react-router-dom';
import {IconButton, makeStyles} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import routes from '../../../router/routes';
import {ReactComponent as Logo} from '../../../assets/svg/logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'black'
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

function Header() {
  const classes = useStyles();

  const history = useHistory();
  
  const goToHomeHandler = () => {
    history.push(routes.home);
  };

  return (
    <div className={classes.root}>
      <Logo className={classes.logo} onClick={() => goToHomeHandler()} />
      <IconButton>
        <AccountCircle className={classes.profile} />
      </IconButton>
    </div>
  );
}

export default Header;
