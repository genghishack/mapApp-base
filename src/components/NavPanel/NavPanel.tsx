import React from 'react';

import NavItem from "./NavItem";

import './NavPanel.scss';

interface INavPanel {
  resources: any;
  userId: string | null;
}

const NavPanel = (props: INavPanel) => {
  const {resources, userId} = props;

  return (
    <div className="NavPanel">
      <header>Resources</header>
      <div className="navItems">
        {resources.map(resource => (
          <NavItem
            key={resource.id}
            resource={resource}
            userId={userId}
          />
        ))}
      </div>
    </div>
  )
}

export default NavPanel;
