import React from 'react';
import {Route, Switch} from "react-router-dom";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import NotFound from './components/views/NotFound';
import ResourceView from "./components/views/ResourceView";
import AboutView from "./components/views/AboutView";
import EnterInfoView from "./components/views/EnterInfoView";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ResourceView/>
      </Route>
      <Route exact path="/login">
        <LoginView/>
      </Route>
      <Route exact path="/signup">
        <SignupView />
      </Route>
      <Route exact path="/about" >
        <AboutView />
      </Route>
      <Route exact path="/enter-info" >
        <EnterInfoView/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes;
