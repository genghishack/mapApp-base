import React from 'react';

import './NavPanel.scss';
import NavItem from "./NavItem";

interface INavPanel {
  resources: any;
}

const NavPanel = (props: INavPanel) => {
  const {resources} = props;

  return (
    <div className="NavPanel">
      <header>Resources</header>
      {resources.map(resource => (
        <NavItem
          key={resource.id}
          resource={resource}/>
      ))}
    </div>
  )
}

export default NavPanel;
