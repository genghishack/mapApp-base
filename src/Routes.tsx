import React from 'react';
import {Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./components/Auth/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Auth/UnauthenticatedRoute";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ResetPassword from "./components/Auth/ResetPassword";
import Settings from './components/Auth/Settings';
import ChangePassword from "./components/Auth/ChangePassword";
import ChangeEmail from "./components/Auth/ChangeEmail";
import NotFound from './components/views/NotFound';
import ResourceView from "./components/views/ResourceView";
import AboutView from "./components/views/AboutView";
import CreateResourceView from "./components/views/CreateResourceView";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ResourceView/>
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <LoginView/>
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/signup">
        <SignupView />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings" >
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/password">
        <ChangePassword />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/email">
        <ChangeEmail />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/create-resource" >
        <CreateResourceView/>
      </AuthenticatedRoute>
      <Route exact path="/about" >
        <AboutView />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes;
