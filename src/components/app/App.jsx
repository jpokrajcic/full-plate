import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Apartments from '../apartments/Apartments';
import Posts from '../posts/Posts';
import Dashboard from '../dashboard/Dashboard';
import NoRoute from '../noRoute/NoRoute';
import Login from '../login/Login';
import routes from '../../router/routes';
import Tasks from '../tasks/Tasks';
import Navigation from '../navigation/Navigation';
import Home from '../home/Home';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path={routes.login}>
              <Login />
            </Route>
            <Route exact path={routes.home}>
              <Home />
            </Route>
            <Route exact path={routes.tasks}>
              <Tasks />
            </Route>
            <Route path={routes.apartments}>
              <Apartments />
            </Route>
            <Route path={routes.posts}>
              <Posts />
            </Route>
            <Route path={routes.dashboard}>
              <Dashboard />
            </Route>
            <Route>
              <NoRoute />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
