import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Auth} from 'aws-amplify';

import {AppContext} from "./libs/contextLib";
import {onError} from "./libs/errorLib";
import ResourceView from './components/views/ResourceView';
import AboutView from './components/views/AboutView';
import LoginView from './components/views/LoginView';
import EnterInfoView from './components/views/EnterInfoView';

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
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  if (!isAuthenticating) {
    return (
      <div className="App">
        {/*@ts-ignore*/}
        <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
          <Router>
            <Switch>
              <Route path="/login" component={LoginView}/>
              <Route path="/about" component={AboutView}/>
              <Route path="/enter-info" component={EnterInfoView} />
              <Route path="/" component={ResourceView}/>
            </Switch>
          </Router>
        </AppContext.Provider>
      </div>
    )
  } else {
    return (
      <div className="App">foo</div>
    )
  }
}

export default App;
