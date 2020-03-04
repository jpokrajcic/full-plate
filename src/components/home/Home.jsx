import React from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();

  function goToLoginHandler() {
    history.replace({
      pathname: '/login'
    });
  }

  return (
    <div className={classes.container}>
      <h1>HOME PAGE</h1>
      <Button color="primary" onClick={goToLoginHandler} variant="contained">
        Log in
      </Button>
    </div>
  );
}

export default Home;
