import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';
import {SnackbarProvider} from 'notistack';
import Apartments from '../apartments/Apartments';
import Messages from '../messages/Messages';
import Dashboard from '../dashboard/Dashboard';
import NoRoute from '../noRoute/NoRoute';
import Login from '../login/Login';
import routes from '../../router/routes';
import Tasks from '../tasks/Tasks';
import Navigation from '../navigation/Navigation';
import Buildings from '../buildings/Buildings';
import AppTheme from './AppTheme';
import Header from '../common/header/Header';
import PrivateRoute from '../../router/PrivateRoute';
import Home from '../home/Home';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        autoHideDuration={3000}
      >
        <Router>
          <div>
            <Header />
            <Navigation />

            <Switch>
              <Route exact path={routes.home}>
                <Home />
              </Route>
              <Route exact path={routes.login}>
                <Login />
              </Route>

              <PrivateRoute exact path={routes.buildings}>
                <Buildings />
              </PrivateRoute>
              <PrivateRoute path={`${routes.tasks}`}>
                <Tasks />
              </PrivateRoute>
              <PrivateRoute path={routes.apartments}>
                <Apartments />
              </PrivateRoute>
              <PrivateRoute path={routes.messages}>
                <Messages />
              </PrivateRoute>
              <PrivateRoute path={routes.dashboard}>
                <Dashboard />
              </PrivateRoute>

              <Route>
                <NoRoute />
              </Route>
            </Switch>
          </div>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
