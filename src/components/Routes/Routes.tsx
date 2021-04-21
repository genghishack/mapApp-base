import React from 'react';
import {Route, Switch} from "react-router-dom";

import {UserRoute, GuestRoute, AdminRoute} from "./RouteLevels";
import NotFound from '../NotFound';
import About from "../About";
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
        <About/>
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
      <UserRoute exact path="/:userId" component={ResourceContainer}>
        {null}
      </UserRoute>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  )
}

export default Routes;
