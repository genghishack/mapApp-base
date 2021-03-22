import React from 'react';

import NavItem from "./NavItem";

import './NavPanel.scss';

interface INavPanel {
  resources: any;
}

const NavPanel = (props: INavPanel) => {
  const {resources} = props;

  return (
    <div className="NavPanel">
      <header>Resources</header>
      <div className="navItems">
        {resources.map(resource => (
          <NavItem
            key={resource.id}
            resource={resource}
          />
        ))}
      </div>
    </div>
  )
}

export default NavPanel;
