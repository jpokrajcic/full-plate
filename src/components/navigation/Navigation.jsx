import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import routes from '../../router/routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2)
  },
  link: {
    textDecoration: 'none'
  }
}));

function Navigation() {
  const classes = useStyles();
  const location = useLocation();

  if (location.pathname === routes.home || location.pathname === routes.login) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Link to={routes.home} className={classes.link}>
        Home
      </Link>
      <Link to={routes.tasks} className={classes.link}>
        Tasks
      </Link>
      <Link to={routes.apartments} className={classes.link}>
        Apartments
      </Link>
      <Link to={routes.posts} className={classes.link}>
        Posts
      </Link>
      <Link to={routes.dashboard} className={classes.link}>
        Dashboard
      </Link>
      <Link to={routes.login} className={classes.link}>
        Log out
      </Link>
    </div>
  );
}

export default Navigation;
