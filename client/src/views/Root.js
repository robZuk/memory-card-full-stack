import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import Navbar from '../components/molecules/Navbar/Navbar';
import Landing from '../views/Landing';
import Login from './Login';
import Register from './Register';

const Root = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path={routes.landing} component={Landing} />
      <Route exact path={routes.login} component={Login} />
      <Route exact path={routes.register} component={Register} />
    </Switch>
  </Router>
);

export default Root;
