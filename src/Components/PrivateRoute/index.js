import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

/**
 * @author
 * @function index
 **/

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
//   const { state } = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: 'signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
