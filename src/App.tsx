import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Auth} from 'aws-amplify';

import {AppContext} from "./libs/contextLib";
import {onError} from "./libs/errorLib";
import Routes from './Routes';

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

  return (
    <div className="App">
      {isAuthenticating ? (
        <>
          {/*  Loading indicator or null here */}
        </>
      ) : (
        <>
          {/*@ts-ignore*/}
          <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
            <Router>
              <Routes />
            </Router>
          </AppContext.Provider>
        </>
      )}
    </div>
  )
}

export default App;
