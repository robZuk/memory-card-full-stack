import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import { theme } from '../theme/mainTheme';
import { ThemeProvider } from 'styled-components';
import store from '../store';
import { Provider } from 'react-redux';
import GlobalStyle from '../theme/GlobalStyle';
import Navbar from '../components/molecules/Navbar/Navbar';
import Landing from '../views/Landing';
import Login from './Login';
import Register from './Register';

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={routes.landing} component={Landing} />
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.register} component={Register} />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default Root;
