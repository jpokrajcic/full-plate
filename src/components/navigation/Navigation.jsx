import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {parse} from 'query-string';
import {makeStyles} from '@material-ui/core';
import routes from '../../router/routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2)
  },
  // link: {
  //   textDecoration: 'none',
  //   color: theme.palette.primaryLight
  // },
  // activeLink: {
  //   textDecoration: 'none',
  //   color: theme.palette.secondary
  // },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: '16px',
    '&.active': {
      textDecoration: 'none',
      color: theme.palette.primary.dark,
      fontWeight: 'bold',
      fontSize: '18px'
    }
  }
}));

function Navigation() {
  const classes = useStyles();
  const location = useLocation();
  const {buildingId} = parse(location.search);

  let searchParams = '';
  if (buildingId !== '') searchParams = `?buildingId=${buildingId}`;

  if (
    location.pathname === routes.login ||
    location.pathname === routes.home ||
    location.pathname === routes.buildings
  ) {
    return null;
  }

  return (
    <div className={classes.root}>
      <NavLink to={routes.buildings} className={classes.link}>
        Buildings
      </NavLink>
      <NavLink
        to={{pathname: routes.tasks, search: searchParams}}
        className={classes.link}
      >
        Tasks
      </NavLink>
      <NavLink
        to={{pathname: routes.apartments, search: searchParams}}
        className={classes.link}
      >
        Apartments
      </NavLink>
      <NavLink
        to={{pathname: routes.messages, search: searchParams}}
        className={classes.link}
      >
        Posts
      </NavLink>
      <NavLink
        to={{pathname: routes.dashboard, search: searchParams}}
        className={classes.link}
      >
        Dashboard
      </NavLink>
    </div>
  );
}

export default Navigation;
