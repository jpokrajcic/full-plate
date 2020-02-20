import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';
import Apartments from '../apartments/Apartments';
import Posts from '../posts/Posts';
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
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: 'Odi popravi ljestve',
      description: 'To su jako pokvarene ljestve',
      categoryId: 1,
      done: false,
      dueDate: new Date('2014-08-18T21:11:54')
    },
    {
      id: 1,
      name: 'Promijeni zarulju',
      description: 'Zute boje',
      categoryId: 2,
      done: true,
      dueDate: new Date('2015-08-18T21:11:54')
    },
    {
      id: 2,
      name: 'Promijeni tapete',
      description: 'Odaberi neki cvjetni uzorak',
      categoryId: 3,
      done: false,
      dueDate: new Date('2016-08-18T21:11:54')
    },
    {
      id: 3,
      name: 'Provjeri lasere',
      description: 'Alieni napadaju!',
      categoryId: 4,
      done: false,
      dueDate: new Date('2019-08-18T21:11:54')
    }
  ]);

  const [taskCategories, setTaskCategories] = useState([
    {
      id: 1,
      name: 'Electricity'
    },
    {
      id: 2,
      name: 'Water'
    },
    {
      id: 3,
      name: 'Security'
    },
    {
      id: 4,
      name: 'Plumbing'
    }
  ]);

  const [apartments, setApartments] = useState([
    {
      id: 0,
      firstName: 'Jon',
      lastName: 'Snow',
      number: 101
    },
    {
      id: 1,
      firstName: 'Tyrion',
      lastName: 'Lannister',
      number: 102
    },
    {
      id: 2,
      firstName: 'Sandor',
      lastName: 'Clagane',
      number: 103
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Aryn',
      number: 104
    }
  ]);

  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
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
            <PrivateRoute path={routes.posts}>
              <Posts />
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
    </ThemeProvider>
  );
}

export default App;
