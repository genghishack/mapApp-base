import React from 'react';
import NavItem from './NavItem';
import {useAppContext} from "../../libs/contextLib";

const Nav = () => {
  //@ts-ignore
  const { isAuthenticated } = useAppContext();

  return (
    <div className="Nav">
      <NavItem label="Resources" pathname="/" />
      <NavItem label="About" pathname="/about" />
      {isAuthenticated ? (
        <>
          <NavItem label="Enter Info" pathname="/enter-info" />
        </>
      ) : null }
    </div>
  )
}

export default Nav;
