import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

/**
 * @author
 * @function index
 **/

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/signin' />
      }
    />
  );
};

export default PrivateRoute;
