import React from 'react';

import {useAppContext} from "../../libs/contextLib";
import NavItem from './NavItem';

const Nav = () => {
  //@ts-ignore
  const { isEditor, isAdmin } = useAppContext();

  return (
    <div className="Nav">
      <NavItem label="Resource Map" pathname="/" />
      {isEditor || isAdmin
        ? <NavItem label="Create Resource" pathname="/create-resource" />
        : null }
      <NavItem label="About" pathname="/about" />
    </div>
  )
}

export default Nav;
