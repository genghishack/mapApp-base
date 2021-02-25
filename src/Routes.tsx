import React from 'react';
import {Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import ResetPassword from "./components/Auth/ResetPassword";
import Profile from './components/User/Profile';
import ChangePassword from "./components/User/ChangePassword";
import ChangeEmail from "./components/User/ChangeEmail";
import NotFound from './components/views/NotFound';
import ResourceView from "./components/views/ResourceView";
import AboutView from "./components/views/AboutView";
import CreateResourceView from "./components/views/CreateResourceView";
import AuthContainer from "./containers/AuthContainer";
import ChangeName from "./components/User/ChangeName";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ResourceView/>
      </Route>
      <UnauthenticatedRoute exact path="/auth">
        <AuthContainer/>
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/profile" >
        <Profile />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/profile/password">
        <ChangePassword />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/profile/email">
        <ChangeEmail />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/profile/name">
        <ChangeName />
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
