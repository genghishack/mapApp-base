import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import {connect} from "react-redux";

import {AppContext} from "./libs/contextLib";
import {onError} from "./libs/errorLib";
import {getUser} from './libs/userLib';
import {setCurrentUser} from "./redux/actions/currentUser";
import Routes from './Routes';
import Header from "./components/Header/Header";

import './App.scss';
import './components/views/views.scss';

interface IAppProps {
  dispatch: Function;
  currentUser: any;
}

const App = (props: IAppProps) => {
  const {dispatch, currentUser} = props;
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      if (!currentUser.id) {
        const user = await getUser();
        dispatch(setCurrentUser(user.data));
      }
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
              <Header/>
              <Routes/>
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
