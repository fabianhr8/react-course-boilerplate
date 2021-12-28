import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import createHistory from 'history/createBrowserHistory';

// This is used to rediect user to certain pagaes duing login and logout
export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
          <Switch>
              <PublicRoute path='/' component={LoginPage} exact={true} />
              <PrivateRoute path='/dashboard' component={DashboardPage} exact={true} />
              <Route component={NotFoundPage} />
          </Switch>
    </Router>
);

export default AppRouter;
