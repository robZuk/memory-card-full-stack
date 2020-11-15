import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "../routes";
import { theme } from "../theme/mainTheme";
import { ThemeProvider } from "styled-components";
import store from "../store";
import { Provider } from "react-redux";
import Alert from "../components/molecules/Alert.js";
import Navbar from "../components/molecules/Navbar.js";
import Landing from "../views/Landing";
import Login from "./Login";
import Register from "./Register";
import Categories from "./categories/Categories";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";
import PrivateRoute from "../components/routing/PrivateRoute";
import styled from "styled-components";
import Category from "./category/Category";
import Cards from "./category/Cards";
// import {
//   CSSTransition,
//   TransitionGroup,
// } from 'react-transition-group';

const StyledWrapper = styled.div`
  position: absolute;
  top: 20%;
  height: 100%;
  width: 100%;
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

          <StyledWrapper>
            <StyledAlert />
            {/* <Route render={({location})=>(
            <TransitionGroup className="todo-list">
            <CSSTransition
              key= {location.key}
              timeout={300}
              classNames="item"
            > */}
            <Switch>
              <Route exact path={routes.landing} component={Landing} />
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.register} component={Register} />
              <PrivateRoute
                exact
                path={routes.categories}
                component={Categories}
              />
              <PrivateRoute exact path={routes.category} component={Category} />
              <PrivateRoute exact path={routes.cards} component={Cards} />
            </Switch>
            {/* </CSSTransition>
            </TransitionGroup>
            )}/> */}
          </StyledWrapper>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
