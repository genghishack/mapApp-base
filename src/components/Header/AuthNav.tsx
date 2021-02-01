import React from 'react';
import {useHistory} from "react-router-dom";
import {Auth} from "aws-amplify";
import NavItem from './NavItem';
import {useAppContext} from "../../libs/contextLib";

const AuthNav = () => {
  const history = useHistory();
  //@ts-ignore
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleLogout = async () => {
    await Auth.signOut()
    userHasAuthenticated(false);
    history.push('/');
  }

  return (
    <div className="AuthNav">
      <NavItem label="About" pathname="/about" />
      {isAuthenticated ? (
        <>
          <NavItem label="Logout" callback={handleLogout} />
        </>
      ) : (
        <>
          <NavItem label="Signup" pathname="/signup" />
          <NavItem label="Login" pathname="/login" />
        </>
      )}
    </div>
  )
}

export default AuthNav;
