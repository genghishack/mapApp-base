import React from 'react';
import NavItem from './NavItem';
import {useAppContext} from "../../libs/contextLib";

const Nav = () => {
  //@ts-ignore
  const { isAuthenticated } = useAppContext();

  return (
    <div className="Nav">
      <NavItem label="Resources" pathname="/" />
      {isAuthenticated ? (
        <>
          <NavItem label="Create Resource" pathname="/create-resource" />
        </>
      ) : null }
    </div>
  )
}

export default Nav;
