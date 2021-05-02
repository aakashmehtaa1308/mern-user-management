import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from '../../App';
import Home from '../../Container/Home';
import SignIn from '../../Container/SignIn';
import SignUp from '../../Container/SignUp';
import PrivateRoute from '../PrivateRoute';
import ErrorPage from '../../Container/ErrorPage';
import Users from '../../Container/Users';
import Profile from '../../Container/Profile';

/**
 * @author
 * @function MainRouter
 **/

const MainRouter = (props) => {
  const { state } = React.useContext(AuthContext);
  return (
    <div>
      <Switch>
        <PrivateRoute
          exact
          path='/'
          component={Home}
          isAuthenticated={state.isAuthenticated}
        />
        <PrivateRoute
          exact
          path='/users'
          component={Users}
          isAuthenticated={state.isAuthenticated}
        />
        <PrivateRoute
          exact
          path='/profile/users'
          component={Profile}
          isAuthenticated={state.isAuthenticated}
        />
        {!state.isAuthenticated && (
          <Route exact path='/signin' component={SignIn} />
        )}
        {!state.isAuthenticated && (
          <Route exact path='/signup' component={SignUp} />
        )}
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
};

export default MainRouter;
