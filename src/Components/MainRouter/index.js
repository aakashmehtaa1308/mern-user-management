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
import MyProfile from '../../Container/MyProfile';
import ForgotPassword from '../../Container/ForgotPassword';
import ResetPassword from '../../Container/ResetPassword';

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
        <PrivateRoute
          exact
          path='/users/myprofile'
          component={MyProfile}
          isAuthenticated={state.isAuthenticated}
        />
        {!state.isAuthenticated && (
          <Route exact path='/signin' component={SignIn} />
        )}
        {!state.isAuthenticated && (
          <Route exact path='/signup' component={SignUp} />
        )}
        {!state.isAuthenticated && (
          <Route
            exact
            path='/users/forgot-password'
            component={ForgotPassword}
          />
        )}
        {!state.isAuthenticated && (
          <Route exact path='/users/reset-password' component={ResetPassword} />
        )}
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
};

export default MainRouter;
