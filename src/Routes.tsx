import React from 'react';
import {Route, Switch} from "react-router-dom";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import NotFound from './components/views/NotFound';
import ResourceView from "./components/views/ResourceView";
import AboutView from "./components/views/AboutView";
import EnterInfoView from "./components/views/EnterInfoView";
import AuthenticatedRoute from "./components/Auth/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Auth/UnauthenticatedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ResourceView/>
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <LoginView/>
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <SignupView />
      </UnauthenticatedRoute>
      <Route exact path="/about" >
        <AboutView />
      </Route>
      <AuthenticatedRoute exact path="/enter-info" >
        <EnterInfoView/>
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes;
