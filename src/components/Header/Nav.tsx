import React from 'react';
import NavItem from './NavItem';
import {useAppContext} from "../../libs/contextLib";

const Nav = () => {
  //@ts-ignore
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleLogout = () => {
    userHasAuthenticated(false);
  }

  return (
    <div className="Nav">
      <NavItem label="Resources" pathname="/" />
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
