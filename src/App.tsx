import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Auth} from 'aws-amplify';

import {AppContext} from "./libs/contextLib";
import ResourceView from './components/views/ResourceView';
import AboutView from './components/views/AboutView';
import LoginView from './components/views/LoginView';

import './App.scss';
import './components/views/views.scss';

interface IAppProps {
}

const App = (props: IAppProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div className="App">
        {/*@ts-ignore*/}
        <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
          <Router>
            <Switch>
              <Route path="/login" component={LoginView}/>
              <Route path="/about" component={AboutView}/>
              <Route path="/" component={ResourceView}/>
            </Switch>
          </Router>
        </AppContext.Provider>
      </div>
    )
  )
}

export default App;
