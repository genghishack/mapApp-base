import React from 'react';
import {Route, Switch} from "react-router-dom";

import {UserRoute, GuestRoute, AdminRoute} from "./RouteLevels";
import NotFound from '../views/NotFound';
import AboutView from "../views/AboutView";
import AuthContainer from "../../containers/AuthContainer";
import ProfileContainer from "../../containers/ProfileContainer";
import AdminContainer from '../../containers/AdminContainer';
import ResourceContainer from '../../containers/ResourceContainer';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ResourceContainer/>
      </Route>
      <Route exact path="/about">
        <AboutView/>
      </Route>
      <GuestRoute exact path="/auth">
        <AuthContainer/>
      </GuestRoute>
      <UserRoute exact path="/profile">
        <ProfileContainer/>
      </UserRoute>
      <AdminRoute exact path="/admin">
        <AdminContainer/>
      </AdminRoute>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  )
}

export default Routes;
