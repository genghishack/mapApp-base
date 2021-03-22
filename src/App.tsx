import React, {useState, useEffect, useCallback} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import {connect} from "react-redux";

import {AppContext} from "./context/AppContext";
import {onError} from "./libs/errorLib";
import {getUser} from './libs/userLib';
import {setCurrentUser} from "./redux/actions/currentUser";
import Routes from './components/Routes/Routes';
import Header from "./components/Header/Header";

import './App.scss';

interface IAppProps {
  dispatch: Function;
  currentUser: any;
}

const App = (props: IAppProps) => {
  const {dispatch, currentUser} = props;
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const onLoad = useCallback(async () => {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
      if (!currentUser.id) {
        const user = await getUser();
        dispatch(setCurrentUser(user.data));
      }
    } catch (e) {
      if (e !== 'No current user' && e.code !== 'UserNotFoundException') {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }, [currentUser.id, dispatch])

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useEffect(() => {
    if (isAuthenticated && currentUser.roles) {
      setIsEditor(currentUser.roles.includes('Editor'));
      setIsAdmin(currentUser.roles.includes('Admin'));
    } else {
      setIsEditor(false);
      setIsAdmin(false);
    }
  }, [isAuthenticated, currentUser])

  return (
    <div className="App">
      {isAuthenticating ? (
        <>
          {/*  Loading indicator or null here */}
        </>
      ) : (
        <>
          <AppContext.Provider value={{
            isAuthenticated, setIsAuthenticated,
            isEditor, isAdmin,
          }}>
            <Router>
              <Header/>
              <div id="main-container">
                <Routes/>
              </div>
            </Router>
          </AppContext.Provider>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(App);
