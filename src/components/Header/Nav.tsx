import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import NavItem from './NavItem';
import {useAppContext} from "../../libs/contextLib";

const Nav = () => {
  const history = useHistory();
  //@ts-ignore
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleLogout = async () => {
    await Auth.signOut()
    userHasAuthenticated(false);
    history.push('/login');
  }

  return (
    <div className="Nav">
      <NavItem label="Resources" pathname="/" />
      <NavItem label="Enter Info" pathname="/enter-info" />
      <NavItem label="About" pathname="/about" />
      {isAuthenticated ? (
        <NavItem label="Logout" callback={handleLogout} />
      ) : (
        <NavItem label="Login" pathname="/login" />
      )}
    </div>
  )
}

export default Nav;
