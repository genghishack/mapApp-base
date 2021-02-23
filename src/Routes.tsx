import React from 'react';
import {Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import ResetPassword from "./components/Auth/ResetPassword";
import Settings from './components/User/Settings';
import ChangePassword from "./components/User/ChangePassword";
import ChangeEmail from "./components/User/ChangeEmail";
import NotFound from './components/views/NotFound';
import ResourceView from "./components/views/ResourceView";
import AboutView from "./components/views/AboutView";
import CreateResourceView from "./components/views/CreateResourceView";
import AuthContainer from "./containers/AuthContainer";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ResourceView/>
      </Route>
      <UnauthenticatedRoute exact path="/auth">
        <AuthContainer/>
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
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
