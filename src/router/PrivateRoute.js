/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UserReducer from '../redux/reducers/UserReducer';

function PrivateRoute({children, isAuthenticated, ...rest}) {
  console.log('Privatna ruta');
  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.userReducer.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
