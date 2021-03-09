import React from 'react';
import {Route, Switch} from "react-router-dom";

import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import EditorRoute from './components/Routes/EditorRoute';
import AdminRoute from './components/Routes/AdminRoute';
import NotFound from './components/views/NotFound';
import AboutView from "./components/views/AboutView";
import CreateResourceView from "./components/views/CreateResourceView";
import AuthContainer from "./containers/AuthContainer";
import ProfileContainer from "./containers/ProfileContainer";
import AdminContainer from './containers/AdminContainer';
import ResourceContainer from './containers/ResourceContainer';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ResourceContainer/>
      </Route>
      <Route exact path="/about">
        <AboutView/>
      </Route>
      <UnauthenticatedRoute exact path="/auth">
        <AuthContainer/>
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/profile">
        <ProfileContainer/>
      </AuthenticatedRoute>
      <EditorRoute exact path="/create-resource">
        <CreateResourceView/>
      </EditorRoute>
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
