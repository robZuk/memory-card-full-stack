import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import { theme } from '../theme/mainTheme';
import { ThemeProvider } from 'styled-components';
import store from '../store';
import { Provider } from 'react-redux';
import Alert from '../components/molecules/Alert';
import Navbar from '../components/molecules/Navbar/Navbar';
import Landing from '../views/Landing';
import Login from './Login';
import Register from './Register';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 4%;
  height: auto;
  width: 80%;
`;
const StyledAlert = styled(Alert)``;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Root = () => {
  useEffect(() => {
    store.dispatch(loadUser(), []);
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Route exact path={routes.landing} component={Landing} />

          <StyledWrapper>
            <StyledAlert />
            <Switch>
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.register} component={Register} />
            </Switch>
          </StyledWrapper>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
