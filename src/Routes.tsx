import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import NotFound from './components/views/NotFound';
import ResourceView from "./components/views/ResourceView";
import AboutView from "./components/views/AboutView";
import CreateResourceView from "./components/views/CreateResourceView";
import AuthContainer from "./containers/AuthContainer";
import ProfileContainer from "./containers/ProfileContainer";

interface IRoutes {
  currentUser: any;
}

const Routes = (props: IRoutes) => {
  const {currentUser} = props;

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
        {currentUser.roles && (currentUser.roles.includes('Editor') || currentUser.roles.includes('Admin'))
        ? <CreateResourceView/> : <NotFound/>}
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

const mapStateToProps = (state: { errors: any; currentUser: any }) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(Routes);
