import React from 'react';
import {Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import NotFound from './components/views/NotFound';
import ResourceView from "./components/views/ResourceView";
import AboutView from "./components/views/AboutView";
import CreateResourceView from "./components/views/CreateResourceView";
import AuthContainer from "./containers/AuthContainer";
import ProfileContainer from "./containers/ProfileContainer";

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
        <ProfileContainer />
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
