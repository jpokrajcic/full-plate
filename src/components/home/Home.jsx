import React from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {useHistory, Redirect} from 'react-router-dom';
import routes from '../../router/routes';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();

  const goToLogin = () => {
    console.log('bababa');
    history.replace({
      pathname: '/login'
    });

    //return <Redirect to="/dashboard" />;
  };

  return (
    <div className={classes.container}>
      <h1>HOME PAGE</h1>
      <Button color="primary" onClick={goToLogin} variant="contained">
        Log in
      </Button>
    </div>
  );
}

export default Home;
