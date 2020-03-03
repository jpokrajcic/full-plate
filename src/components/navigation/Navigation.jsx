import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {parse} from 'query-string';
import {makeStyles, Tabs, Tab} from '@material-ui/core';
import routes from '../../router/routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: '32px 0px'
  },
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
  const [value, setValue] = React.useState(1);

  const tabChangeHandler = (event, newValue) => {
    setValue(newValue);
  };

  let searchParams = '';
  if (buildingId !== '') searchParams = `?buildingId=${buildingId}`;

  if (
    location.pathname === routes.login ||
    location.pathname === routes.home ||
    location.pathname === routes.buildings
  ) {
    // If user returns on home/login/buildings screen set selection to first tab
    if (value !== 1) {
      setValue(1);
    }

    return null;
  }

  return (
    <div className={classes.root}>
      <Tabs
        onChange={tabChangeHandler}
        value={value}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          value={1}
          label="Tasks"
          to={{pathname: routes.tasks, search: searchParams}}
          component={NavLink}
        />

        <Tab
          value={2}
          label="Apartments"
          to={{pathname: routes.apartments, search: searchParams}}
          component={NavLink}
        />

        <Tab
          value={3}
          label="Messages"
          to={{pathname: routes.messages, search: searchParams}}
          component={NavLink}
        />

        <Tab
          value={4}
          label="Dashboard"
          to={{pathname: routes.dashboard, search: searchParams}}
          component={NavLink}
        />
      </Tabs>
    </div>
  );
}

export default Navigation;
